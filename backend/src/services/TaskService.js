import Task from "../domain/Task.js";

export default class TaskService{
    constructor(taskRepository){
        this.taskRepository = taskRepository;
    }

    async createTask(dto){
        if (!dto.title){
            throw new Error("Título obrigatório.");
        }
        const task = new Task(null, dto.title, false);
        return await this.taskRepository.createTask(task);
    }

    async completeTask(id, dto){
        const task = await this.taskRepository.getTaskById(id);
        if (!task){
            throw new Error("Tarefa não foi encontrada.");
        }
        return await this.taskRepository.updateTask(id, dto.completed);
    }

    async updateTaskTitle(id, dto){
        const task = await this.taskRepository.getTaskById(id);
        if (!task){
            throw new Error("Tarefa não foi encontrada.");
        }
        return await this.taskRepository.updateTaskTitle(id, dto.title);
    }

}