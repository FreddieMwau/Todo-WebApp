import express from 'express'
import mssql from 'mssql'
import sqlConfig from './Backend/config/config'
import router from './Backend/routes/todoRoutes'
import cors from 'cors'

const app = express()
app.use(cors( {origin: true }))
app.use(express.json())
app.use('/toDo', router)
app.listen(4000, () => {
    console.log("Backend running on server port => 4000");
})


const checkDbConnection = async () => {
    try{
        const x = await mssql.connect(sqlConfig)
        if(x.connected){
            console.log("Connected to the DB.....");
            
        }
    } catch (error: any){
        error.message
        console.log(error.message);
        
    }
}
checkDbConnection()