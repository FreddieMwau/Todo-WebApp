import { Request, RequestHandler, Response } from "express";
import { v1 as uid} from 'uuid'
import mssql from 'mssql'
import sqlConfig from "../config/config";
import { newTask } from "../helpers/formValidator";

// Create a new task
export const createTodo = async (req:Request, res:Response) => {
    try{
        const id = uid()
        const { title, description, date, assignEmail } = req.body as { title: string, description: string, date: string, assignEmail: string }
        let dbPool = await mssql.connect(sqlConfig)
        // validation
        const {error} = newTask.validate(req.body)
        if(error) {
            return res.json({error: error.details[0].message})
        }
        await dbPool.request()
            .input('id', mssql.VarChar, id)
            .input('title', mssql.VarChar, title)
            .input('description', mssql.VarChar, description)
            .input('date', mssql.VarChar, date)
            .input('assignEmail', mssql.VarChar, assignEmail)
            .execute('createToDo')
        res.json({ message: "ToDo task created successfully" })
    } catch (error: any){
        res.json({error: error.message})
    }
}

// Gets all Tasks
export const getAllToDos = async (req:Request, res:Response) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const toDos = await dbPool.request()
            .execute('getToDos')
        res.json(toDos.recordset)
    } catch (error:any){
        res.json({ error: error.message })
    }
}

// Delete all tasks
export const deleteAllTasks: RequestHandler = async (req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        dbPool.request().execute('deleteAllToDos')
        res.status(200).json({message: "All tasks deleted"})
    } catch(error:any){
        res.json({error: error.message})
    }
}

// Get task by Id
export const getToDoById:RequestHandler<{id:string}> = async (req, res) => {
    try{
        const toDoId= req.params.id
        let dbPool = await mssql.connect(sqlConfig)
        const toDoById = await dbPool.request()
            .input('id', mssql.VarChar, toDoId)
            .execute('getToDoById')
        if(!toDoById.recordset[0]){
            return res.json({message: `No ToDo task with id : ${toDoId} exists`})
        } else{
            return res.json(toDoById.recordset[0])
        }
    } catch (error:any){
        res.json({ error: error.message })
    }
}

// Updates Tasks
export const updateToDo: RequestHandler<{ id: string }> = async (req, res) => {
    try{
        const id = req.params.id
        let dbPool = await mssql.connect(sqlConfig)
        const { title, description, date, assignedEmail } = req.body as { title: string, description: string, date: string, assignedEmail: string }

        // check if task exists
        const toDo = await dbPool.request()
            .input('id', mssql.VarChar, id)
            .execute('getToDoById')
        
        if(!toDo.recordset[0]){   
            return res.json({message: `ToDo task with id :${id} does not exist in our DB` })
        }

        // Validation
        const{error} = newTask.validate(req.body)
        if(error){
            return res.json({error: error.details[0].message})
        }

        await dbPool.request()
            .input('id', mssql.VarChar, id)
            .input('title', mssql.VarChar, title)
            .input('description', mssql.VarChar, description)
            .input('date', mssql.VarChar, date)
            .input('assignEmail', mssql.Bit, assignedEmail)
            .execute('updateToDo')
        res.json({message: "Task updated successfully"})
    } catch(error:any){
        res.json({ error: error.message })
    }
}

// Delete Tasks
export const deleteToDo: RequestHandler<{ id: string }> = async(req, res) => {
    try{
        const id = req.params.id
        let dbPool = mssql.connect(sqlConfig)

        // check if task exists
        const toDo = (await dbPool).request()
            .input('id', mssql.VarChar, id)
            .execute('getToDoById')

        if (!(await toDo).recordset[0]) {
            return res.json({ message: `ToDo task with id :${id} does not exist in our DB` })
        }

        (await dbPool).request()
            .input('id', mssql.VarChar, id)
            .execute('deleteTask')
        res.status(200)
            .json({ message: "Task deleted successfully" })
    } catch(error: any){
        res.json({error: error.message})
    }
}

// Changes the completed status
export const isCompletedStatus: RequestHandler<{id:string}> = async (req, res) => {
    try{
        const id = req.params.id
        let dbPool = mssql.connect(sqlConfig)

        let isCompleted: boolean = true

        // check if task exists
        const toDo = (await dbPool).request()
            .input('id', mssql.VarChar, id)
            .execute('getToDoById')

        if(!(await toDo).recordset[0]){
            return res.json({ message: `ToDo task with id :${id} does not exist in our DB`})
        }

        (await dbPool).request()
            .input('id', mssql.VarChar, id)
            .input('isCompleted', mssql.Bit, isCompleted)
            .execute('completedStatus')

        res.json({message: 'isCompleted status updated'})

    } catch(error: any){
        res.json({error: error.message})
    }
}

// Get all completed tasks
export const getAllCompletedToDos: RequestHandler = async (req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const completedTodos = await dbPool
            .request()
            .execute('getCompletedToDos')
        res.json(completedTodos.recordset)
    } catch (error: any) {
        res.json({error: error.message})
    }
}

// Get all uncompleted tasks
export const getAllUncompletedToDos: RequestHandler = async (req, res) => {
    try {
        let dbPool = await mssql.connect(sqlConfig)
        const completedTodos = await dbPool
            .request()
            .execute('getUnCompletedToDos')
        res.json(completedTodos.recordset)
    } catch (error: any) {
        res.json({ error: error.message })
    }
}