"use strict";
const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    service: "gmail",
    auth: {
      user: "dawoodworld370@gmail.com",
      pass: "eykoknwqehabnayt",
    },
  });

//   console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   eykoknwqehabnayt

module.exports = transporter;