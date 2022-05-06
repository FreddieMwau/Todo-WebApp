"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUncompletedToDos = exports.getAllCompletedToDos = exports.isCompletedStatus = exports.deleteToDo = exports.updateToDo = exports.getAllToDos = exports.createTodo = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
// Create a new task
const createTodo = async (req, res) => {
    try {
        const id = (0, uuid_1.v1)();
        const isCompleted = false;
        const { title, description, date } = req.body;
        let dbPool = await mssql_1.default.connect(config_1.default);
        await dbPool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('title', mssql_1.default.VarChar, title)
            .input('description', mssql_1.default.VarChar, description)
            .input('date', mssql_1.default.VarChar, date)
            .input('isCompleted', mssql_1.default.Bit, isCompleted)
            .execute('createToDo');
        res.json({ message: "ToDo task created successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.createTodo = createTodo;
// Gets all Tasks
const getAllToDos = async (req, res) => {
    try {
        let dbPool = await mssql_1.default.connect(config_1.default);
        const toDos = await dbPool.request()
            .execute('getToDos');
        res.json(toDos.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getAllToDos = getAllToDos;
// Updates Tasks
const updateToDo = async (req, res) => {
    try {
        const id = req.params.id;
        let dbPool = await mssql_1.default.connect(config_1.default);
        const { title, description, date } = req.body;
        // check if task exists
        const toDo = await dbPool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getToDoById');
        if (!toDo.recordset[0]) {
            return res.json({ message: `ToDo task with id :${id} does not exist in our DB` });
        }
        await dbPool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('title', mssql_1.default.VarChar, title)
            .input('description', mssql_1.default.VarChar, description)
            .input('date', mssql_1.default.VarChar, date)
            .execute('updateToDo');
        res.json({ message: "Task updated successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.updateToDo = updateToDo;
// Delete Tasks
const deleteToDo = async (req, res) => {
    try {
        const id = req.params.id;
        let dbPool = mssql_1.default.connect(config_1.default);
        // check if task exists
        const toDo = (await dbPool).request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getToDoById');
        if (!(await toDo).recordset[0]) {
            return res.json({ message: `ToDo task with id :${id} does not exist in our DB` });
        }
        (await dbPool).request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('deleteTask');
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.deleteToDo = deleteToDo;
// Changes the completed status
const isCompletedStatus = async (req, res) => {
    try {
        const id = req.params.id;
        let dbPool = mssql_1.default.connect(config_1.default);
        let isCompleted = true;
        // check if task exists
        const toDo = (await dbPool).request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getToDoById');
        if (!(await toDo).recordset[0]) {
            return res.json({ message: `ToDo task with id :${id} does not exist in our DB` });
        }
        (await dbPool).request()
            .input('id', mssql_1.default.VarChar, id)
            .input('isCompleted', mssql_1.default.Bit, isCompleted)
            .execute('completedStatus');
        res.json({ message: 'isCompleted status updated' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.isCompletedStatus = isCompletedStatus;
// Get all completed tasks
const getAllCompletedToDos = async (req, res) => {
    try {
        let dbPool = await mssql_1.default.connect(config_1.default);
        const completedTodos = await dbPool.request().execute('getCompletedToDos');
        res.json(completedTodos.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getAllCompletedToDos = getAllCompletedToDos;
// Get all uncompleted tasks
const getAllUncompletedToDos = async (req, res) => {
    try {
        let dbPool = await mssql_1.default.connect(config_1.default);
        const completedTodos = await dbPool.request().execute('getUnCompletedToDos');
        res.json(completedTodos.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getAllUncompletedToDos = getAllUncompletedToDos;
