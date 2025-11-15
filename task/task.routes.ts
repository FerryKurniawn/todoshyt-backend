import {
  create,
  getAllTask,
  getTaskById,
  patchTask,
  updateTask,
  getUserIdTasks,
  deleteUserIdTask,
} from "./task.controller.ts";
import express from "express";
const router = express.Router();

router.post("/tasks", create);
router.get("/tasks", getAllTask);
router.get("/tasks/:userId", getUserIdTasks);
router.get("/tasks/:userId/:id", getTaskById);
router.put("/tasks/:userId/:id", updateTask);
router.patch("/tasks/:userId/:id", patchTask);
router.delete("/tasks/:userId/:id", deleteUserIdTask);

export default router;
