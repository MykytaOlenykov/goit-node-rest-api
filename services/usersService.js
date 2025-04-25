import { User } from "../db/models/index.js";
import { HttpError } from "../helpers/HttpError.js";

const changeSubscription = async (body, user) => {
  await User.update(body, { where: { id: user.id } });
  const updatedUser = await User.findOne({ where: { id: user.id } });
  if (!updatedUser) throw HttpError(404);
  return {
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  };
};

export const usersService = {
  changeSubscription,
};
