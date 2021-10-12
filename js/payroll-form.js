window.addEventListener('DOMContentLoaded', (event)=>{
  const name=document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function(){
    if(name.value.length == 0){
      textError.textContent ="";
      return;
    }
    try{
      (new EmployeePayrollData()).name =name.value; ;
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
  })

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
});

const save = () => {
  try{
    let employeePayrollData = createEmployeePayroll();
  }catch(e){
    return;
  }
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
  employeePayrollData.department = getSelectedValues('[name=department]').pop();
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.notes = getInputValueById('#notes');
  let date = getInputValueById('#year')+"-"+ getInputValueById('#month')+"-"+
            getInputValueById('#day');
  employeePayrollData.date=new Date(Date.parse(date));
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



