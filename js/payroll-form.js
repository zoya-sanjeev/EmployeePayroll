let isUpdate = false;
let employeePayrollObj ={};

window.addEventListener('DOMContentLoaded', (event)=>{
  const name=document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function(){
    if(name.value.length == 0){
      textError.textContent ="";
      return;
    }
    try{
      new EmployeePayrollData().name =name.value; 
      textError.textContent ="";
    }catch(e){
      textError.textContent = e;
    }
  });

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function(){
    output.textContent = salary.value;
  });


  var date = document.getElementById("day");
  var month = document.getElementById("month");
  var year = document.getElementById("year");
  const dateError = document.querySelector(".date-error");
  date.addEventListener("change", validateDate);
  month.addEventListener("change", validateDate);
  year.addEventListener("change", validateDate);

  function validateDate() {
    let startDate = Date.parse(
      year.value + "-" + month.value + "-" + date.value
    );
    try {
      new EmployeePayrollData().startDate = startDate;
      dateError.textContent = "";
    } catch (e) {
      dateError.textContent = e;
    }
  }
  checkForUpdate();
});

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setEmployeePayrollObject();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(site_properties.home_page);
  } catch (e) {
    console.error(e);
    return;
  }
};

const setEmployeePayrollObject = () => {
  if(!isUpdate && site_properties.use_local_storage.match("true")){
    employeePayrollObj.id = createNewEmployeeId();
  }
  employeePayrollObj._name = getInputValueById("#name");
  employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
  employeePayrollObj.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollObj.department = getSelectedValues("[name=department]");
  employeePayrollObj.salary = getInputValueById("#salary");
  employeePayrollObj.note = getInputValueById("#notes");
  let date =getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");
  employeePayrollObj.startDate = new Date(Date.parse(date));
};

const createAndUpdateStorage = () => {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList) {
    let empPayrollData = employeePayrollList.find((empData) => empData.id == employeePayrollObj.id);

    if (!empPayrollData) {
      employeePayrollList.push(employeePayrollObj);
    } else {
      const index = employeePayrollList
            .map((empData) => empData.id)
            .indexOf(empPayrollData.id);
      employeePayrollList.splice(index,1,employeePayrollObj);
    }
  } else {
    employeePayrollList = [employeePayrollObj];
  }
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
};

const createNewEmployeeId = () => {
  let employeeId = localStorage.getItem('EmployeeId');
  employeeId = !employeeId ? 1: (parseInt(employeeId)+1).toString();
  localStorage.setItem('EmployeeId', employeeId);
  return employeeId;
}

const getSelectedValues = (propertyValue) =>{
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if(item.checked) selItems.push(item.value);
  });
  return selItems;
}
const getInputValueById =(id) =>{
  let value =document.querySelector(id).value;
  return value;
}

const setForm = () => {
  setValue('#name', employeePayrollObj._name);
  setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
  setSelectedValues('[name=gender]', employeePayrollObj._gender);
  setSelectedValues('[name=department]', employeePayrollObj._department);
  setValue('#salary', employeePayrollObj._salary);
  setTextValue('.salary-output',employeePayrollObj._salary);
  setValue("#notes", employeePayrollObj._notes);
  let date = getDate(employeePayrollObj._startDate).split(" ");         
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);

}
const getDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
  return newDate;
}

const setSelectedValues = (propertyValue, value) =>{
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if(Array.isArray(value)){
      if(value.includes(item.value)){
        item.checked = true;
      }
    }
    else if(item.value == value)
      item.checked = true;
  })
}
const resetForm = () => {
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary','');
  setValue('#notes','');
  setValue('#day',"1");
  setValue('#month', "1");
  setValue('#year',"2021");
  setTextValue(".salary-output", "400000");
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item =>{
      item.checked = false;
  });
}
const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if(!isUpdate) return ;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
}

