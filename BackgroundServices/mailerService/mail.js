"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const mailer_1 = __importDefault(require("../helpers/mailer"));
const config_1 = __importDefault(require("../../Backend/config/config"));
dotenv_1.default.config();
const emailingService = async () => {
    console.log("emails");
    console.log("B4 connecting db");
    const dbPool = await mssql_1.default.connect(config_1.default);
    console.log("DB Connected");
    const users = (await dbPool
        .request()
        .execute('getNewTasks'))
        .recordset;
    console.log(users);
    const completedTasks = (await dbPool
        .request()
        .execute('getCompletedTasks'))
        .recordset;
    console.log(completedTasks);
    for (let task of completedTasks) {
        console.log("Emailing admin");
        ejs_1.default.renderFile('/home/jokinggenius/Dev/typescript/toDoApp/BackgroundServices/templates/registration.ejs', { name: task.assignEmail, title: task.title, dueDate: task.date, description: task.description, completedDate: task.completedDate }, async (error, data) => {
            const mailOption = {
                from: process.env.EMAIL,
                to: process.env.EMAIL,
                subject: 'Task has been completed',
                html: `<p>Hello admin,</p>
                        <p>The task assigned to ${task.assignEmail} is completed, log in to the system to check the details</p>
                        <p>The task is ${task.title}</p>
                        <p>The description is ${task.description}</p>
                        <p>It is due on ${new Date(task.date).toLocaleString()} and was completed on ${new Date(task.completedDate).toLocaleDateString()}</p>`,
                // html:data
            };
            try {
                await (0, mailer_1.default)(mailOption);
                await dbPool.request()
                    .input('id', mssql_1.default.VarChar, task.id)
                    .execute('isAdminSent');
                console.log('Admin mail sent ');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    console.log("B4 Emailing user");
    for (let user of users) {
        console.log(user);
        console.log("Emailing user");
        // using the ejs file
        ejs_1.default.renderFile("./BackgroundServices/templates/registration.ejs", { name: user.assignEmail, task: user.title, dueDate: user.date, description: user.description }, async (error, data) => {
            // mail options
            const mailOptions = {
                from: process.env.EMAIL,
                to: user.assignEmail,
                subject: 'You have been assigned a task',
                html: `<p>Hello user,</p>
                        <p>A task has been assigned to you, log in to the system to check the details</p>
                        <p>The task is ${user.title}</p>
                        <p>The description is ${user.description}</p>
                        <p>It is due on ${user.date}</p>`,
                // text: `This task has been assigned to you. The task is ${user.title}. Please have it completed before the end of 48 hours thanks. `,
                // html: data,
                attachments: [
                    {
                        filename: 'tasks.txt',
                        content: user.title
                    }
                ]
            };
            try {
                // sending the email
                await (0, mailer_1.default)(mailOptions);
                console.log("Emailing endi");
                await dbPool.request()
                    .input('id', mssql_1.default.VarChar, user.id)
                    .execute('updateAssignedEmail');
                console.log("Success mail sent.");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
exports.default = emailingService;
