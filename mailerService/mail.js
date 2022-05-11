"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
const mailer_1 = __importDefault(require("../helpers/mailer"));
dotenv_1.default.config();
const emailingService = async () => {
    // using the ejs file
    ejs_1.default.renderFile("../templates/registration.ejs", { name: 'Fredrick Mutua' }, async (error, data) => {
        // mail options
        const mailOptions = {
            from: process.env.EMAIL,
            to: 'oldgrinch69@gmail.com',
            subject: 'Test Email',
            text: 'Hello mothafucka.........',
            html: data
        };
        try {
            // sending the email
            await (0, mailer_1.default)(mailOptions);
            console.log("Success mail sent.");
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.default = emailingService;
