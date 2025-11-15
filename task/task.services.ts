import { prisma } from "../prisma/client.ts";

export const createTaskService = async (
  taskName: string,
  description: string
) => {
  const task = await prisma.task.create({
    data: { taskName, description },
  });

  return task;
};

export const getTasksService = async () => {
  const task = await prisma.task.findMany();
  return task;
};

export const getTaskByIdService = async (id: number) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

export const putTaskService = async (
  id: number,
  taskName: string,
  description: string
) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });
  if (!task) {
    throw new Error("Task not found");
  }

  const updateTask = await prisma.task.update({
    where: { id },
    data: { taskName, description },
  });

  return updateTask;
};

export const patchTaskService = async (
  id: number,
  taskName?: string,
  description?: string
) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const data: any = {};

  if (taskName) {
    data.taskName = taskName;
  }
  if (description) {
    data.description = description;
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data,
  });

  return updatedTask;
};
