let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  employeePayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem("editEmp");
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
};

const createInnerHtml = () => {
  const headerHtml =
    "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
  if (employeePayrollList.length == 0) return;
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of employeePayrollList) {
      console.log(empPayrollData);
    innerHtml = `${innerHtml}
        <tr>
        <td><img class="profile" alt="" src="${
          empPayrollData._profilePic
        }"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
        <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img id="${empPayrollData.id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
        </td>
        </tr>
        `;
  }
  document.querySelector("#table-display").innerHTML = innerHtml;
};


const getDeptHtml = (departmentList) => {
  let deptHtml = "";
  for (const dept of departmentList) {
    deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
  }
  return deptHtml;
};

const remove = (node) => {
    console.log(node);
    console.log(employeePayrollList);
    let empPayrollData = employeePayrollList.find(empData => empData.id == node.id);
    if (!empPayrollData) return;
    const index = employeePayrollList
      .map(empData => empData.id)
      .indexOf(empPayrollData.id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
  };

const update = (node) => {
    console.log("hello");
    let empPayrollData = employeePayrollList.find(empDate => empDate.id == node.id)
    if(!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_employee_payroll_page);
}