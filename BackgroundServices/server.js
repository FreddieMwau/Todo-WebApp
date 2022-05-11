"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const mail_1 = __importDefault(require("./mailerService/mail"));
const app = (0, express_1.default)();
// app.use(express.json())
app.listen(4500, () => {
    console.log("Background services running on server port ==> 4500");
});
const run = async () => {
    node_cron_1.default.schedule('*/5 * * * * *', async () => {
        await (0, mail_1.default)();
        console.log('Running after every 5 secs');
    });
};
run();
