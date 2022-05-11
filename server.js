"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("./Backend/config/config"));
const todoRoutes_1 = __importDefault(require("./Backend/routes/todoRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.use('/toDo', todoRoutes_1.default);
app.listen(4000, () => {
    console.log("Backend running on server port => 4000");
});
const checkDbConnection = async () => {
    try {
        const x = await mssql_1.default.connect(config_1.default);
        if (x.connected) {
            console.log("Connected to the DB.....");
        }
    }
    catch (error) {
        error.message;
        console.log(error.message);
    }
};
checkDbConnection();
