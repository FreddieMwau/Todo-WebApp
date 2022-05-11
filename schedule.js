"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const runSchedule = () => {
    console.log('running ');
    // should initialy have 6 stars
    node_cron_1.default.schedule('* * * * *', async () => {
        console.log('running after every minute');
    });
};
runSchedule();
