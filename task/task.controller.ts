import type { Request, Response } from "express";

import {
  createUserTaskService,
  getTasksService,
  getTaskByIdService,
  putTaskService,
  patchTaskService,
  getUserTasksService,
} from "../task/task.services.ts";
import { z } from "zod";

const taskSchema = z.object({
  taskName: z.string().min(1, "task name field are required"),
  description: z.string(),
});

export const create = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }
    const { taskName, description } = parsed.data;
    const taskCreate = await createUserTaskService(
      userId,
      taskName,
      description
    );
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
  } catch (error) {}
};
export const getUserIdTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const getTask = await getUserTasksService(userId);
    return res.json({ task: getTask });
  } catch (error) {}
};
export const getTaskById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.params.userId;
  try {
    const taskById = await getTaskByIdService(userId, id);
    return res.json(taskById);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error get task by id:", error);
    return res.status(500).json({ error: error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.params.userId;
  try {
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }
    const { taskName, description } = parsed.data;

    const updateTask = await putTaskService(id, userId, taskName, description);
    return res.json({ data: updateTask, message: "Update task success" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error update task:", error);
    return res.status(400).json({ error: error });
  }
};

export const patchTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.params.userId;
  try {
    const parsed = taskSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }
    const { taskName, description } = parsed.data;

    const updatedTask = await patchTaskService(
      id,
      userId,
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
