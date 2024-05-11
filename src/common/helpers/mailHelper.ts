const nodemailer = require("nodemailer");
import User from "../../models/accounts/userModel";
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { template } = require("handlebars/runtime");
require("dotenv").config();

// const registerMail = ({ userEmail, payloads, template }: any) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.titan.email",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.bossMail,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     const source = fs.readFileSync(path.join(__dirname, template), "utf8");
//     const compiledTemplate = handlebars.compile(source);
//     let mailOptions = {
//       from: process.env.bossMail,
//       to: userEmail,
//       subject:
//         "Welcome to Acheva",
//       html: compiledTemplate(payloads),
//     };

//     transporter.sendMail(mailOptions, function (error: any, info: any) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//   } catch (err) {
//     return err;
//   }
// };

const sendMail = (
  userEmail: string,
  subject: string,
  payload: any,
  template: any
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.bossMail,
        pass: process.env.MAIL_PASS,
      },
    });
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const textField = compiledTemplate(payload);
    let mailOptions = {
      sender: process.env.bossMail,
      to: userEmail,
      subject: subject,
      html: textField,
      text: textField,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    return err;
  }
};
export {
  //   registerMail,
  sendMail,
};
