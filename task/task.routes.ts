import {
  create,
  getAllTask,
  getTaskById,
  patchTask,
  updateTask,
} from "./task.controller.ts";
import express from "express";
const router = express.Router();

router.post("/tasks", create);
router.get("/tasks", getAllTask);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id", patchTask);

export default router;
