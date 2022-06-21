import express from 'express'
import cron from 'node-cron'

import mailerService from './mailerService/mail'

const app = express()
app.listen(4500, () => {
    console.log("Background services running on server port ==> 4500");
    
})
console.log("Apa");

const mail = async () => {
    console.log("Pale");
    cron.schedule('*/5 * * * * *', async () => {
        await mailerService()
        console.log("B4");
        console.log("Mailed");
        console.log('Running after every 5 secs');
    })
}

mail()