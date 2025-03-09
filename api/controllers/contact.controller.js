import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const contact = async (req, res) => {
    
  const { sender, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: sender,
    to: "badusvanmark@gmail.com",
    subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" ,success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending email" });
  }
};
