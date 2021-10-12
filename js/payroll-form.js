var salaryOutput = document.querySelector(".salary-output");
var salary = document.querySelector("#salary");
salary.addEventListener("input", function () {
  salaryOutput.textContent = salary.value;
});



