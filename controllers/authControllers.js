import { authServices } from "../services/authServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const register = async (req, res) => {
  const user = await authServices.register(req.body);
  res.status(201).json({ data: { user } });
};

const login = async (req, res) => {
  const { token, user } = await authServices.login(req.body);
  res.status(200).json({ data: { token, user } });
};

const logout = async (req, res) => {
  await authServices.logout(req.user);
  res.status(204).send();
};

const current = (req, res) => {
  const user = {
    email: req.user.email,
    subscription: req.user.subscription,
    avatarURL: req.user.avatarURL,
  };
  res.status(200).json({ data: { user } });
};

export const authControllers = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
