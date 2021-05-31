const nodemailer = require("nodemailer");
const { emailAddress, emailPassword } = require("../secrets");

let sendEmail = async (receiver, subject, text, html) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: emailAddress,
        pass: emailPassword,
      },
    });

    const mailDetalils = {
      from: `System Admin 📧 <ratiba.app@gmail.com>`,
      to: receiver,
      subject: subject,
      text: text,
      html: html,
    };

    let result = await transport.sendMail(mailDetalils);
    return result;
  } catch (error) {
    return error;
  }
};
module.exports.email = email;
