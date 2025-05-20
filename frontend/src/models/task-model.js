export class TaskModel {
  constructor({
    ManagerId,
    employeeId,
    taskTitle,
    TaskDes,
    value,
    status = null,
    statusDes,
    result,
  }) {
    this.ManagerId = ManagerId;
    this.employeeId = employeeId;
    this.taskTitle = taskTitle;
    this.TaskDes = TaskDes;
    this.value = value;
    this.status = status;
    this.statusDes = statusDes;
    this.result = result;
  }

  static fromJson(json) {
    return new TaskModel({
      ManagerId: json.ManagerId,
      employeeId: json.employeeId,
      taskTitle: json.taskTitle,
      TaskDes: json.TaskDes,
      value: json.value,
      status: json.status ?? null,
      statusDes: json.statusDes,
      result: json.result,
    });
  }

  toJson() {
    return {
      ManagerId: this.ManagerId,
      employeeId: this.employeeId,
      taskTitle: this.taskTitle,
      TaskDes: this.TaskDes,
      value: this.value,
      status: this.status,
      statusDes: this.statusDes,
      result: this.result,
    };
  }
}