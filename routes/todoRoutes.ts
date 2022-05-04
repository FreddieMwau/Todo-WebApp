import express from 'express'
import { createTodo, deleteToDo, getAllToDos, isCompletedStatus, updateToDo } from '../controller/todoController'
const router = express.Router()


router.post('/newToDo', createTodo)
router.get('/', getAllToDos)
router.put('/:id', updateToDo)
router.delete('/:id', deleteToDo)
router.patch('/:id', isCompletedStatus)

export default router