import dotenv from 'dotenv'
import ejs from 'ejs'
import mssql from 'mssql'

import sentMail from '../helpers/mailer'
import sqlConfig from '../../Backend/config/config'
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
    console.log("emails");
    

    console.log("B4 connecting db");
    
    const dbPool = await mssql.connect(sqlConfig)
    console.log("DB Connected");
    
    const users: userInterface[]= (await dbPool
        .request()
        .execute('getNewTasks'))
        .recordset
    console.log(users);
        

    const completedTasks : adminInterface[] = (await dbPool
        .request()
        .execute('getCompletedTasks'))
        .recordset
    console.log(completedTasks);
        

    for(let task of completedTasks){
        console.log("Emailing admin");
        ejs.renderFile('/home/jokinggenius/Dev/typescript/toDoApp/BackgroundServices/templates/registration.ejs', 
                            {name: task.assignEmail, title: task.title, dueDate:task.date, description: task.description, completedDate: task.completedDate}, 
                            async (error, data) => {
            const mailOption = {
                from: process.env.EMAIL as string,
                to: process.env.EMAIL as string,
                subject: 'Task has been completed',
                html: `<p>Hello admin,</p>
                        <p>The task assigned to ${task.assignEmail} is completed, log in to the system to check the details</p>
                        <p>The task is ${task.title}</p>
                        <p>The description is ${task.description}</p>
                        <p>It is due on ${new Date(task.date).toLocaleString()} and was completed on ${new Date(task.completedDate).toLocaleDateString()}</p>`,
                // html:data
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

    console.log("B4 Emailing user");
    for(let user of users ){
        console.log(user);
        
        console.log("Emailing user");
        // using the ejs file
        ejs.renderFile("./BackgroundServices/templates/registration.ejs", { name: user.assignEmail, task: user.title, dueDate: user.date, description: user.description }, async (error, data) => {
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
                console.log("Emailing endi");
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