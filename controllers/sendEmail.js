const nodemailer = require("nodemailer");


const sendEmail = function (receiver, code) {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "studymanegementsys@gmail.com",
      pass: process.env.GOOGLE,
    },
  });

  const mailOption = {
    from: "studymanegementsys@gmail.com",
    to: receiver,
    subject: "Recovery Code",
    text: `Your code: ${code}\n\nThis code will expired in 24 hours.`,
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) console.log(err.message);
  });
};

module.exports = sendEmail;
