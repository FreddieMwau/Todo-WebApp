import express from 'express'
import mssql from 'mssql'
import sqlConfig from './config/config'
import router from './routes/todoRoutes'
import cors from 'cors'

const app = express()
 app.use(cors( {origin: true }))
app.use(express.json())


app.use('/toDo', router)
app.listen(4000, () => {
    console.log("App running on server ====> 4000");
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