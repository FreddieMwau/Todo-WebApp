"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.post('/newToDo', todoController_1.createTodo);
router.get('/', todoController_1.getAllToDos);
router.get('/getCompleted', todoController_1.getAllCompletedToDos);
router.get('/getUncompleted', todoController_1.getAllUncompletedToDos);
router.patch('/:id', todoController_1.updateToDo);
router.delete('/:id', todoController_1.deleteToDo);
router.patch('/isCompleted/:id', todoController_1.isCompletedStatus);
exports.default = router;
