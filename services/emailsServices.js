import path from "node:path";

import ejs from "ejs";

import { sendEmail } from "../helpers/sendEmail.js";

const templateDir = path.resolve("templates");

const sendVerificationEmail = async (userEmail, verificationURL) => {
  const emailTemplate = path.join(templateDir, "verificationEmail.ejs");

  const html = await ejs.renderFile(emailTemplate, {
    userEmail,
    verificationURL,
  });

  const userEmailOptions = {
    to: userEmail,
    subject: "Account Verification",
    html,
  };

  return await sendEmail(userEmailOptions);
};

export const emailsServices = {
  sendVerificationEmail,
};
