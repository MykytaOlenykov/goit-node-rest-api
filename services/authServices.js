import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";

import { User } from "../db/models/index.js";
import { emailsServices } from "./emailsServices.js";
import { HttpError } from "../helpers/HttpError.js";
import { hashSecret, verifySecret } from "../helpers/hashing.js";
import { jwt } from "../helpers/jwt.js";
import { settings } from "../settings.js";

const register = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await hashSecret(password);

  const avatarURL = gravatar.url(email, { s: "200" }, true);

  const verificationToken = uuidv4();

  const newUser = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verificationURL = `${settings.baseUrl}/api/auth/verify/${verificationToken}`;

  await emailsServices.sendVerificationEmail(email, verificationURL);

  return {
    email: newUser.email,
    subscription: newUser.subscription,
  };
};

const login = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await verifySecret(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, { expiresIn: "9h" });

  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const logout = async (user) => {
  await User.update({ token: null }, { where: { id: user.id } });
};

const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ where: { verificationToken } });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await user.update({ verificationToken: null, verify: true });

  return { message: "Verification successful" };
};

export const authServices = {
  register,
  login,
  logout,
  verifyEmail,
};
