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
    throw new Error("Task does not exist");
  }
  return task;
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
    throw new Error("Task does not exist");
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

export const deleteTaskService = async (id: number) => {
  const taskExist = await prisma.task.findUnique({ where: { id } });
  if (!taskExist) {
    throw new Error("Task does not exist ");
  }

  const deleteTask = await prisma.task.delete({ where: { id } });

  return deleteTask;
};
