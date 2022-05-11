import express from 'express'
import cron from 'node-cron'

import mailerService from './mailerService/mail'

const app = express()
// app.use(express.json())
app.listen(4500, () => {
    console.log("Background services running on server port ==> 4500");
    
})

const run = async () => {
    cron.schedule('*/5 * * * * *', async () => {
        await mailerService()
        console.log('Running after every 5 secs');
    })
}

run()