import { prisma } from "../prisma/client.js";

export const createTaskService = async (
  taskName: string,
  description: string
) => {
  const task = await prisma.task.create({
    data: { taskName, description },
  });

  return task;
};

export const getTasksService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const tasks = await prisma.task.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalTasks = await prisma.task.count();

  return { tasks, totalTasks };
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
  description?: string,
  isDone?: boolean
) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new Error("Task does not exist");
  }

  const data: any = {};

  if (taskName !== undefined) {
    data.taskName = taskName;
  }
  if (description !== undefined) {
    data.description = description;
  }
  if (isDone !== undefined) {
    data.isDone = isDone;
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
