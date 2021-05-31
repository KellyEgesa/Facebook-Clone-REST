module.exports.Html = (resetUrl) => {
  return `<body style="padding: 2%;""><div style="width: 85%;
    height: 85%;
    padding: 5%;
    display: flex;
    border: 1px solid black; 
    align-items: center;">
    <p>Hey!<br>You are receiving this email because you have requested to reset your password for your FACEBOOK-CLONE-REST account<br>Please click on the following link within an hour to reset your password<br>If you did not request the password change kindly ignore the link. Your password will remain unchanged.<br> <a href=${resetUrl}><button style="background-color: blue; 
    border: none;
    color: white;
    padding: 20px; 
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10%;
    cursor: pointer;
    border-radius: 15px;">RESET MY PASSWORD </button></a>"
  </p>
  </div></body>`;
};

module.exports.Text = (resetUrl) => {
  return `Hey! 
    You are receiving this email because you have requested to reset your password for your FACEBOOK-CLONE-REST account
    Please click on the following link within an hour to reset your password
    If you did not request the password change kindly ignore the link. 
    Your password will remain unchanged.
    ${resetUrl}
`;
};

module.exports.Subject = "Password Change for Facebook Clone!!!";
