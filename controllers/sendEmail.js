const nodemailer = require("nodemailer");

exports.sendEmail = (receiver, code) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "studymanegementsys@gmail.com",
      pass: "@5RA2C^vh6zAR8sd"
    }
  });

  const mailOption = {
    from: "studymanegementsys@gmail.com",
    to: receiver,
    subject: "Recovery Code",
    text: `Your code: ${code}`
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) console.log(err.message);
  });
};
