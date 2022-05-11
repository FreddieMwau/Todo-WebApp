import dotenv from 'dotenv'
import ejs from 'ejs'
import mssql from 'mssql'
import sqlConfig from '../config/config'
import sentMail from '../helpers/mailer'
dotenv.config()

interface userInterface {
    id: string;
    title:string;
    assignEmail: string;
    isSent: boolean;
    description: string;
    date: string
}

interface adminInterface {
    id: string;
    title:string;
    isCompleted: boolean;
    assignEmail: string;
    date: string
    completedDate: string;
    description: string;
}

const emailingService = async ()=> {

    const dbPool = await mssql.connect(sqlConfig)
    const users: userInterface[]= (await dbPool
        .request()
        .execute('getNewTasks'))
        .recordset

    const completedTasks : adminInterface[] = (await dbPool
        .request()
        .execute('getCompletedTasks'))
        .recordset

    // console.log(completedTasks);

    for(let task of completedTasks){
        ejs.renderFile('./templates/registration.ejs', {name: task.assignEmail}, async (error, data) => {
            const mailOption = {
                from: process.env.EMAIL as string,
                to: process.env.EMAIL as string,
                subject: 'Task has been completed',
                html: `<p>Hello admin,</p>
                        <p>The task assigned to ${task.assignEmail} is completed, log in to the system to check the details</p>
                        <p>The task is ${task.title}</p>
                        <p>The description is ${task.description}</p>
                        <p>It is due on ${new Date(task.date).toLocaleString()} and was completed on ${new Date(task.completedDate).toLocaleDateString()}</p>`,
            }
            try{
                await sentMail(mailOption)
                await dbPool.request()
                        .input('id', mssql.VarChar, task.id)
                        .execute('isAdminSent')
                console.log('Admin mail sent ');
                
            } catch (error){
                console.log(error);
                
            }

        })
    }
    
    for(let user of users ){
        // using the ejs file
        ejs.renderFile("./templates/registration.ejs", { name: user.assignEmail, task: user.title }, async (error, data) => {
            // mail options
            const mailOptions = {
                from: process.env.EMAIL as string,
                to: user.assignEmail,
                subject: 'You have been assigned a task',
                html:  `<p>Hello user,</p>
                        <p>A task has been assigned to you, log in to the system to check the details</p>
                        <p>The task is ${user.title}</p>
                        <p>The description is ${user.description}</p>
                        <p>It is due on ${user.date}</p>`,
                // text: `This task has been assigned to you. The task is ${user.title}. Please have it completed before the end of 48 hours thanks. `,
                // html: data,
                attachments: [
                    {
                        filename:'tasks.txt',
                        content: user.title
                    }
                ] 
            }

            try {
                // sending the email
                await sentMail(mailOptions)
                await dbPool.request()
                        .input('id', mssql.VarChar , user.id)
                        .execute('updateAssignedEmail')
                console.log("Success mail sent.");
            } catch (error) {
                console.log(error);
            } 
        })
    }

}

export default emailingService