import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';


// Check AV+Firewal ...
const sendEmailUtil = (res, mailTo, mailSubject, mailText) => {

  var transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: mailTo,
    subject: mailSubject,
    html: mailText
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
};

export default sendEmailUtil;
