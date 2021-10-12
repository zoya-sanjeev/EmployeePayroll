class EmployeePayrollData {

get id() { return this._id; }
set id(id) {
    let regxId = RegExp('^[1-9][0-9]*$');
    if (regxId.test(id))
        this._id = id;
    else
        throw "Id is incorrect";
}
 
get name() {
    return this._name;
}
set name(name) {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if (nameRegex.test(name)) 
        this._name = name;
    else throw 'Name is Incorrect';
}

get profilePic(){ return this._profilePic; }
set profilePic(profilePic){
    this._profilePic = profilePic;
}

get gender(){ return this._gender;}
set gender(gender){
    this._gender = gender;
}

get department(){return this._department;}
set department(department){
    this._department = department;
}

get salary() { return this._salary; }
set salary(salary) {
    let regxSalary = RegExp('^[1-9][0-9]*$');
    if (regxSalary.test(salary))
       this._salary = salary;
    else
        throw "Salary is incorrect";
}

get note(){ return this._note; }
set note(note){
    this._note = note;
}
get startDate() {
    return this._startDate;
}
set startDate(startDate) {
    if (startDate <= new Date() && Math.abs(startDate - new Date() < 30))
        this._startDate = startDate;
    else throw 'Invalid date';
}

toString() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const empDate = !this.startDate ? "undefined":
                    this.startDate.toLocaleDateString("en-US", options);
    return (
      'id=' +this.id +', name=' +this.name +', salary=' +this.salary +', gender=' +this.gender +
      ', profilePic='+ this.profilePic+ ', department=' + this.department+
      ', salary='+this.salary+', start date=' +empDate+', note='+ this.note);
  }

}

function save() {

    let employeeName = document.querySelector('#name').value;
    let employeeSalary = document.querySelector('#salary').value;

    let day = document.querySelector('#day').value;
    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;
    let employeeStartDate = new Date(year, month, day);

    let employeeNotes = document.querySelector('#notes').value;
    try {
        let employeePayrollData = new EmployeePayrollData(employeeName, employeeSalary, employeeStartDate, employeeNotes);
        console.log(employeePayrollData.toString());
    } catch (e) {
        console.error(e);
    }
}