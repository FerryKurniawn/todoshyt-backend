import {
  create,
  getAllTask,
  getTaskById,
  patchTask,
  deleteTask,
} from "./task.controller.ts";
import express from "express";
const router = express.Router();

router.post("/tasks", create);
router.get("/tasks", getAllTask);
router.get("/tasks/:id", getTaskById);
router.patch("/tasks/:id", patchTask);
router.delete("/tasks/:id", deleteTask);

export default router;
