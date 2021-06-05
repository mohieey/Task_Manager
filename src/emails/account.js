const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.sendgridApiKey);

const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: process.env.myMail,
    subject: "Thanks for joining to our app!",
    text: `Hello ${name}, welcome to the Task Manager app.`,
  };

  await sgMail.send(msg);
};

const sendGoodByeEmail = (email, name) => {
  const msg = {
    to: email,
    from: process.env.myMail,
    subject: "Account Deleted",
    text: `Hello ${name}, your account has been deleted, we hope to see you soon.`,
  };

  sgMail.send(msg);
};
module.exports = { sendWelcomeEmail, sendGoodByeEmail };
