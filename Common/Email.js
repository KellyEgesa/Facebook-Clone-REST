const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const redirectUri = "https://developers.google.com/oauthplayground";
const { Client_ID, Client_Secret, Refresh_Token } = require("../secrets");

const oAuth2Client = new google.auth.OAuth2(
  Client_ID,
  Client_Secret,
  redirectUri
);
oAuth2Client.setCredentials({ refresh_token: Refresh_Token });

let sendEmail = async (receiver, subject, text, html) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "talentql.facebookclone@gmail.com",
        clientId: Client_ID,
        clientSecret: Client_Secret,
        refreshToken: Refresh_Token,
        accessToken: accessToken,
      },
    });

    const mailDetalils = {
      from: `System Admin 📧 <talentql.facebookclone@gmail.com>`,
      to: receiver,
      subject: subject,
      text: text,
      html: html,
    };

    let result = await transport.sendMail(mailDetalils);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports.sendEmail = sendEmail;
