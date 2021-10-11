class EmployeePayrollData {
    id;
    name;
    salary;
    gender;
    startDate;


constructor(...params) {
    this.id = params[0];
    this.name = params[1];
    this.salary = params[2];
    this.gender = params[3];
    this.startDate = params[4];
}

get name() {
    return this._name;
}
set name(name) {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if (nameRegex.test(name)) this._name = name;
    else throw 'Name is Incorrect';
}

}