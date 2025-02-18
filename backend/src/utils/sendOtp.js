import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

const sendOtp = async (email, otp) => {
    try{
        const mailOptions = {
            to: email,
            subject: 'OTP for account verification',
            html: `<h1>Your OTP is ${otp}</h1>`,
        };
    
        const message = await transporter.sendMail(mailOptions);
        if(message){
            return true;
        }

        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};

export { sendOtp };