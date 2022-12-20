const { DB_Headers } = require("../db/headers");
const { v4 } = require("uuid");
const axios = require("axios").default;

class TaskController {
  checkPassword(req, res, next) {
    console.log(req.body);
    if (req.body.password !== process.env.POST_PASSWORD) {
      res.status(400).json("Неверный пароль");
      return;
    }
    next();
  }

  static async updateData(data) {
    const response = await axios({
      method: "put",
      url: process.env.API_BIN_PATH,
      headers: DB_Headers,
      data,
    });

    return response.data;
  }

  static async getAllTasks() {
    const response = await axios({
      method: "get",
      url: process.env.API_BIN_PATH + "latest",
      headers: DB_Headers,
    });

    return response.data;
  }

  static findTaskByTaskId(tasks, taskId) {
    return tasks.filter((task) => task.taskId === taskId)[0];
  }

  async getAll(req, res) {
    console.log(req.body);
    res.json(await TaskController.getAllTasks());
  }

  async getByTaskId(req, res) {
    const taskId = req.params.taskId;
    const tasks = await TaskController.getAllTasks();

    res.json(TaskController.findTaskByTaskId(tasks, taskId));
  }

  async add(req, res) {
    const tasks = await TaskController.getAllTasks();

    const currentTaskId =
      tasks.length > 0 ? +tasks[tasks.length - 1].taskId + 1 : 1;

    const task = {
      id: v4(),
      taskId: "" + currentTaskId,
      ...req.body.data,
    };
    tasks.push(task);
    res.json(await TaskController.updateData(tasks));
  }

  async delete(req, res) {
    const taskId = req.body.data.taskId;
    let tasks = await TaskController.getAllTasks();

    tasks = tasks.filter((task) => task.taskId !== taskId);
    res.json(await TaskController.updateData(tasks));
  }

  async update(req, res) {
    const taskId = req.body.data.taskId;
    const tasks = await TaskController.getAllTasks();

    for (let i = 0; i < tasks.length; ++i) {
      if (tasks[i].taskId == taskId) {
        Object.keys(req.body.data).forEach((key) => {
          tasks[i][key] = req.body.data[key];
        });
      }
    }
    res.json(await TaskController.updateData(tasks));
  }
}

module.exports = new TaskController();
