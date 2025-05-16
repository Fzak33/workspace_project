// models/Employee.js
import { LeaveRequest } from './leave-request-model';
import { ViewAttendance } from './view-attendence';

export class Employee {
  constructor({
    _id = '',
    name = '',
    email = '',
    password = '',
    department = '',
    position = '',
    phoneNumber = '',
    dateOfBirth = new Date(),
    loginCredentials = '',
    salary = 0,
    status = 0,
    leaveRequest = {},
    viewAttendance = {},
    role = '',
    gender = '',
  } = {}) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.department = department;
    this.position = position;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = new Date(dateOfBirth);
    this.loginCredentials = loginCredentials;
    this.salary = salary;
    this.status = status;
    this.leaveRequest = new LeaveRequest(leaveRequest);
    this.viewAttendance = new ViewAttendance(viewAttendance);
    this.role = role;
    this.gender = gender;
  }

  static fromJson(json) {
    return new Employee(json);
  }

  toJson() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      department: this.department,
      position: this.position,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth.toISOString(),
      loginCredentials: this.loginCredentials,
      salary: this.salary,
      status: this.status,
      leaveRequest: this.leaveRequest.toJson(),
      viewAttendance: this.viewAttendance.toJson(), 
      role: this.role,
      gender: this.gender,
    };
  }
}
