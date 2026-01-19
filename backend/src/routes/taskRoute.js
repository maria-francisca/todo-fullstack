import express from "express";
import TaskController from "../controllers/TaskController.js";

const router = express.Router();

// GET todas as tarefas
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gestão de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
router.get("/", (req, res) => TaskController.getAll(req, res));

// GET por id
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obter uma tarefa por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *       404:
 *         description: Tarefa não encontrada
 */
router.get("/:id", (req, res) => TaskController.getTaskById(req, res));

// POST criar nova tarefa
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada
 *       400:
 *         description: Erro de validação
 */
router.post("/", (req, res) => TaskController.create(req, res));

// PATCH atualizar tarefa
/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Marcar tarefa como concluída
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *       404:
 *         description: Tarefa não encontrada
 */
router.patch("/:id", (req, res) => TaskController.complete(req, res));

// DELETE remover tarefa
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remover uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Tarefa removida
 */
router.delete("/:id", (req, res) => TaskController.delete(req, res));

// PUT mudar título de uma tarefa
/**
 * @swagger
 * /tasks/{id}/title:
 *   put:
 *     summary: Alterar título de uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: string
 *          description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       204:
 *         description: Tarefa alterada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Tarefa não encontrada
 */
router.put("/:id/title", (req, res) => TaskController.updateTitle(req, res));

export default router;
