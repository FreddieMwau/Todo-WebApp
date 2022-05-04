"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompletedStatus = exports.deleteToDo = exports.updateToDo = exports.getAllToDos = exports.createTodo = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
// Create a new task
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v1)();
        const isCompleted = false;
        const { title, description, date } = req.body;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        yield dbPool.request()
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
});
exports.createTodo = createTodo;
// Gets all Tasks
const getAllToDos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const toDos = yield dbPool.request()
            .execute('getToDos');
        res.json(toDos.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getAllToDos = getAllToDos;
// Updates Tasks
const updateToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const { title, description, date, isCompleted } = req.body;
        // check if task exists
        const toDo = yield dbPool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getToDoById');
        if (!toDo.recordset[0]) {
            return res.json({ message: `ToDo task with id :${id} does not exist in our DB` });
        }
        yield dbPool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('title', mssql_1.default.VarChar, title)
            .input('description', mssql_1.default.VarChar, description)
            .input('date', mssql_1.default.VarChar, date)
            .input('isCompleted', mssql_1.default.Bit, isCompleted)
            .execute('updateToDo');
        res.json({ message: "Task updated successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.updateToDo = updateToDo;
// Delete Tasks
const deleteToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let dbPool = mssql_1.default.connect(config_1.default);
        // check if task exists
        const toDo = (yield dbPool).request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getToDoById');
        if (!(yield toDo).recordset[0]) {
            return res.json({ message: `ToDo task with id :${id} does not exist in our DB` });
        }
        (yield dbPool).request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('deleteTask');
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteToDo = deleteToDo;
// Changes the completed status
const isCompletedStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let dbPool = mssql_1.default.connect(config_1.default);
        let isCompleted = true;
        // check if task exists
        const toDo = (yield dbPool).request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getToDoById');
        if (!(yield toDo).recordset[0]) {
            return res.json({ message: `ToDo task with id :${id} does not exist in our DB` });
        }
        (yield dbPool).request()
            .input('id', mssql_1.default.VarChar, id)
            .input('isCompleted', mssql_1.default.Bit, isCompleted)
            .execute('completedStatus');
        res.json({ message: 'isCompleted status updated' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.isCompletedStatus = isCompletedStatus;
