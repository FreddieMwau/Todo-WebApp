import express from 'express'
import { createTodo, deleteAllTasks, deleteToDo, getAllCompletedToDos, getAllToDos, getAllUncompletedToDos, getToDoById, isCompletedStatus, updateToDo } from '../controller/todoController'
const router = express.Router()

router.post('/newToDo', createTodo)
router.get('/', getAllToDos)
router.get('/getToDo/:id', getToDoById)
router.delete('/deleteTasks/', deleteAllTasks)
router.get('/getCompleted', getAllCompletedToDos)
router.get('/getUncompleted', getAllUncompletedToDos)
router.patch('/:id', updateToDo)
router.delete('/:id', deleteToDo)
router.patch('/isCompleted/:id', isCompletedStatus)
export default router