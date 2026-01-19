import Task from "../domain/Task.js";
import TaskModel from "../models/TaskModel.js";

export default class TaskRepository {

    async getAll() {
        const tasks = await TaskModel.find();
        return tasks.map(task => new Task(task._id.toString(), task.title, task.completed));
    }

    async getTaskById(id) {
        const tasks = await TaskModel.findById(id);
        if (!tasks) return null;
        return new Task(tasks._id.toString(), tasks.title, tasks.completed);
    }
    
    async createTask(task){
        const created = await TaskModel.create({
            title: task.title, completed: task.completed,
        });
        return new Task(created._id.toString(), created.title, created.completed);
    }

    async updateTask(id, completed){
       const task = await TaskModel.findById(id);
       if (!task) return null;
       task.completed = completed;
       await task.save();
       return new Task(task._id.toString(), task.title, task.completed);
    }

    async deleteTask(id){
        await TaskModel.findByIdAndDelete(id);
    }

    async updateTaskTitle(id, newTitle){
        const task = await TaskModel.findById(id);
        if (!task) return null;
        task.title = newTitle;
        await task.save();
        return new Task(task._id.toString(), task.title, task.completed);
    }

}