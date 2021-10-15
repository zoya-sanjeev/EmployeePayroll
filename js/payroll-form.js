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

const save = () => {
  try{
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
  }catch(e){
    return;
  }
}

function createAndUpdateStorage(employeePayrollData){
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList != undefined){
    if(employeePayrollList.length == 0)
        employeePayrollData._id = 1;
      else
        employeePayrollData._id = employeePayrollList[employeePayrollList.length -1 ]._id + 1;
    employeePayrollList.push(employeePayrollData);
  }else{
    employeePayrollData._id = 1;
      employeePayrollList = [employeePayrollData];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () =>{
  let employeePayrollData = new EmployeePayrollData();
  try{
    employeePayrollData.name = getInputValueById('#name');
  }catch(e){
    setTextValue('.text-error',e);
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.notes = getInputValueById('#notes');
  let date = getInputValueById('#month')+" "+ getInputValueById('#day')+", "+
            getInputValueById('#year');
  employeePayrollData.startDate=new Date(date);
  alert(employeePayrollData.toString());
  return employeePayrollData;
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
  setSelectedValues('[name=department]', employeePayrollObj._departement);
  setValue('#salary', employeePayrollObj._salary);
  setTextValue('.salary-output',employeePayrollObj._salary);
  setValue("#notes", employeePayrollObj._notes);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
  console.log(date);          
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);

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
  setSelectedIndex('#day',0);
  setSelectedIndex('month', 0);
  setSelectedIndex('#year',0);
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

