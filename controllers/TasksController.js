const { DB_Headers } = require('../db/headers');
const axios = require('axios').default;

class TaskController {
	static async updateData(data) {
		try {
			const response = await axios({
				method: 'put',
				url: process.env.API_BIN_PATH,
				headers: DB_Headers,
				data,
			});
			return response.data;
		} catch (err) {
			console.log(err);
		}

		return [];
	}

	static async getAllTasks() {
		try {
			const response = await axios({
				method: 'get',
				url: process.env.API_BIN_PATH + 'latest',
				headers: DB_Headers,
			});
			return response.data;
		} catch (err) {
			console.log(err);
		}

		return [];
	}

	static findTaskByTaskId(tasks, taskId) {
		return tasks.find((task) => +task.taskId === +taskId);
	}

	async getAll(req, res) {
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
			taskId: '' + currentTaskId,
			...req.body.data,
		};
		tasks.push(task);
		TaskController.updateData(tasks)
			.then((data) => {
				const responseData = TaskController.findTaskByTaskId(
					data.record,
					currentTaskId
				);
				res.json({ ...responseData, taskId: currentTaskId });
			})
			.catch((err) => console.log(err));
	}

	async delete(req, res) {
		const taskId = req.body.data.taskId;
		let tasks = await TaskController.getAllTasks();

		tasks = tasks.filter((task) => task.taskId !== taskId);
		await TaskController.updateData(tasks).then((data) => {
			const responseData = TaskController.findTaskByTaskId(data.record, taskId);
			res.json({ ...responseData, taskId });
		});
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
