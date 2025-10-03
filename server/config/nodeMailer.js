import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any SMTP provider
  auth: {
   user: 'arthiksk64@gmail.com',   // your email
   pass: 'eonw ahgg istg emzw' // app password or SMTP key
  },
});

export default transporter;
