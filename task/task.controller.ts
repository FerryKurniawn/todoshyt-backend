import type { Request, Response } from "express";

import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  patchTaskService,
  deleteTaskService,
} from "../task/task.services.ts";
import { z } from "zod";

const taskSchema = z.object({
  taskName: z.string().min(1, "task name field are required"),
  description: z.string(),
});

export const create = async (req: Request, res: Response) => {
  try {
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }
    const { taskName, description } = parsed.data;
    const taskCreate = await createTaskService(taskName, description);
    return res.json({ data: taskCreate, message: "Task created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error create tasks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const getTask = await getTasksService();
    return res.json({ task: getTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const taskById = await getTaskByIdService(id);
    return res.json(taskById);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error get task by id:", error);
    return res.status(500).json({ error: error });
  }
};

export const patchTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const parsed = taskSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }
    const { taskName, description } = parsed.data;

    const updatedTask = await patchTaskService(
      id,

      taskName,
      description
    );

    return res.json(updatedTask);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error patch task:", error);
    return res.status(500).json({ error: error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deletedTask = await deleteTaskService(id);
    return res.json({ data: deletedTask, message: "Delete success" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Task does not exist") {
        return res.status(400).json({ error: error.message });
      }
    }
    console.error(error);
    return res.status(500).json({ error });
  }
};
