import dotenv from 'dotenv'
import ejs from 'ejs'
import sentMail from '../helpers/mailer'
dotenv.config()



const emailingService = async ()=> {
    // using the ejs file
    ejs.renderFile("../templates/registration.ejs", { name: 'Fredrick Mutua' }, async (error, data) => {
        // mail options
        const mailOptions = {
            from: process.env.EMAIL as string,
            to: 'oldgrinch69@gmail.com',
            subject: 'Test Email',
            text: 'Hello mothafucka.........',
            html: data
        }

        try {
            // sending the email
            await sentMail(mailOptions)
            console.log("Success mail sent.");
        } catch (error) {
            console.log(error);
        }
    })
}

export default emailingService