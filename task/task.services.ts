import { prisma } from "../prisma/client.ts";

export const createUserTaskService = async (
  userId: string,
  taskName: string,
  description: string
) => {
  if (!userId) {
    throw new Error("user id is required");
  }

  const userExist = await prisma.user.findUnique({ where: { id: userId } });

  if (!userExist) {
    throw new Error("User does not exist");
  }
  const task = await prisma.task.create({
    data: { userId, taskName, description },
  });

  return task;
};

export const getTasksService = async () => {
  const task = await prisma.task.findMany();
  return task;
};

export const getUserTasksService = async (userId: string) => {
  const task = await prisma.task.findMany({ where: { userId } });
  return task;
};

export const getTaskByIdService = async (userId: string, id: number) => {
  const task = await prisma.task.findUnique({
    where: { userId, id },
  });
  if (!task) {
    throw new Error("Task does not exist");
  }
  return task;
};

export const putTaskService = async (
  id: number,
  userId: string,
  taskName: string,
  description: string
) => {
  const userExist = await prisma.user.findUnique({ where: { id: userId } });
  if (!userExist) {
    throw new Error("User does not exist");
  }
  const task = await prisma.task.findUnique({
    where: { id },
  });
  if (!task) {
    throw new Error("Task does not exist");
  }

  const updateTask = await prisma.task.update({
    where: { id },
    data: { taskName, description },
  });

  return updateTask;
};

export const patchTaskService = async (
  id: number,
  userId: string,
  taskName?: string,
  description?: string
) => {
  const userExist = await prisma.user.findUnique({ where: { id: userId } });

  if (!userExist) {
    throw new Error("User does not exist");
  }

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

export const deleteTaskService = async (id: number, userId: string) => {
  const userExist = await prisma.user.findUnique({ where: { id: userId } });
  if (!userExist) {
    throw new Error("User does not exist ");
  }
  const taskExist = await prisma.task.findUnique({ where: { id } });
  if (!taskExist) {
    throw new Error("Task does not exist ");
  }

  const deleteTask = await prisma.task.delete({ where: { id } });

  return deleteTask;
};
