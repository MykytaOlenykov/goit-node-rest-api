import nodemailer from "nodemailer";

import { settings } from "../settings.js";

const config = {
  host: settings.emailHost,
  port: settings.emailPort,
  secure: true,
  auth: {
    user: settings.emailHostUser,
    pass: settings.emailHostPassword,
  },
};

const transporter = nodemailer.createTransport(config);

export const sendEmail = async (data) => {
  const email = { ...data, from: settings.emailHostUser };
  await transporter.sendMail(email);
  return true;
};
