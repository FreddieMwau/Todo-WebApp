import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()


function createTransporter(config:any){
    // Transporter
    let transport = nodemailer.createTransport(config)
    return transport
}

const configuration = {
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASS as string
    }
    
}

const sentMail = async (mailoption:any) => {
    const transporter = createTransporter(configuration)
    await transporter.verify() //checks the authentication
    await transporter.sendMail(mailoption)
}

export default sentMail