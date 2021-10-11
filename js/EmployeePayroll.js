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

get id() { return this._id; }
set id(id) {
    let regxId = RegExp('^[1-9][0-9]*$');
    if (regxId.test(id))
        this._id = id;
    else
        throw "Id is incorrect";
}
get salary() { return this._salary; }
set salary(salary) {
    let regxSalary = RegExp('^[1-9][0-9]*$');
    if (regxSalary.test(salary))
       this._salary = salary;
    else
        throw "Salary is incorrect";
    }
get startDate() {
    return this._startDate;
}
set startDate(startDate) {
    if (startDate <= new Date() && Math.abs(startDate - new Date() < 30))
        this._startDate = startDate;
    else throw 'Invalid date';
}

}