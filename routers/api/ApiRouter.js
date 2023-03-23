const router = require("express").Router();
const TasksController = require("../../controllers/TasksController");
const {checkPassword, normalizeRequestData} = require("../../middleware");

router.get("/tasks/getAll", TasksController.getAll);

router.get("/tasks/get/:taskId", TasksController.getByTaskId);

router.post(
  "/tasks/add",
  checkPassword,
  // normalizeRequestData,
  TasksController.add
);

router.delete("/tasks/delete", checkPassword, TasksController.delete);

router.put(
  "/tasks/update",
  checkPassword,
  // normalizeRequestData,
  TasksController.update
);

module.exports = router;
