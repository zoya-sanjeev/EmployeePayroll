window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
  });
  
  const createInnerHtml = () => {
    const headerHtml =
      "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>" +
      "<th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {
      innerHtml = `${innerHtml}
          <tr>
          <td><img class="profile" alt="" src="${empPayrollData._picture}"></td>
          <td>${empPayrollData._name}</td>
          <td>${empPayrollData._gender}</td>
          <td>${getDeptHtml(empPayrollData._department)}
          <td>${empPayrollData._salary}</td>
          <td>${empPayrollData._startDate}</td>
          <td>
          <img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
          <img id="1" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
          </td>
          </tr>
          `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
  };
  
  const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
      {
        _name: "Narayan Mahadevan",
        _gender: "Male",
        _department: ["Finance", "Engineering"],
        _salary: "5000000",
        _startDate: "29 Oct, 2020",
        _note: "",
        _id: new Date().getTime(),
        _picture: "../assets/profile-images/Ellipse -2.png",
      },
      {
        _name: "ABC",
        _gender: "Female",
        _department: ["Sales", "Engineering"],
        _salary: "750000",
        _startDate: "10 Dec 2019",
        _note: "",
        _id: new Date().getTime() + 1,
        _picture: "../assets/profile-images/Ellipse -7.png",
      },
    ];
  
    return employeePayrollListLocal;
  };
  
  const getDeptHtml = (departmentList) => {
    let deptHtml = "";
    for (const dept of departmentList) {
      deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
    }
    return deptHtml;
  };