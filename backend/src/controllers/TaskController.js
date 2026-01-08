import CreateTaskDTO from "../dto/CreateTaskDTO.js";
import UpdateTaskDTO from "../dto/UpdateTaskDTO.js";
import TaskRepository from "../repositories/TaskRepository.js";
import TaskService from "../services/TaskService.js";

const repo = new TaskRepository();
const service = new TaskService(repo);

class TaskController {

    async getAll(req, res) {
        const tasks = await repo.getAll();
        return res.status(200).json(tasks);
    }

    async getTaskById(req, res) {
        const task = await repo.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ error: "Tarefa não encontrada"});
        return res.status(200).json(task);
    }

    async create(req, res) {
        try {
            const dto = new CreateTaskDTO(req.body.title);
            const task = await service.createTask(dto);
            return res.status(201).json(task);
        } catch (e) {
            return res.status(400).json({ error: e.message});
        }
    }

    async complete(req, res) {
        try {
            const dto = new UpdateTaskDTO(req.body.completed);
            const task = await service.completeTask(req.params.id, dto);
            return res.status(200).json(task);
        } catch (e) {
            return res.status(404).json({ error: e.message});
        }
    }

    async delete(req, res) {
        await repo.deleteTask(req.params.id);
        return res.status(204).send();
    }

}

export default new TaskController();