const router = require("express").Router();
const TasksController = require("../../controllers/TasksController");
// const cors = require("cors");

router.get("/tasks/getAll", TasksController.getAll);

router.get("/tasks/get/:taskId", TasksController.getByTaskId);

router.post("/tasks/add", TasksController.checkPassword, TasksController.add);

router.delete(
  "/tasks/delete",
  TasksController.checkPassword,
  TasksController.delete
);

router.put(
  "/tasks/update",
  TasksController.checkPassword,
  TasksController.update
);

module.exports = router;
