import { User } from "../db/models/index.js";
import { HttpError } from "../helpers/HttpError.js";
import { hashSecret, verifySecret } from "../helpers/hashing.js";
import { jwt } from "../helpers/jwt.js";

const register = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await hashSecret(password);

  const newUser = await User.create({ ...body, password: hashPassword });

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

  const passwordCompare = await verifySecret(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, { expiresIn: "9h" });

  await User.update({ token }, { where: { id: user.id } });

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

export const authService = {
  register,
  login,
  logout,
};
