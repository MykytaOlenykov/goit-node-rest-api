import { User } from "../db/models/index.js";
import { HttpError } from "../helpers/HttpError.js";
import { filesServices } from "./filesServices.js";

const changeSubscription = async (body, user) => {
  await User.update(body, { where: { id: user.id } });
  const updatedUser = await User.findOne({ where: { id: user.id } });
  if (!updatedUser) throw HttpError(404);
  return {
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  };
};

const updateAvatar = async (file, user) => {
  if (!file) throw HttpError(400, "avatar is required");

  const { avatarURL: prevAvatarURL } = user;

  const avatarURL = await filesServices.processAvatar(file);

  const [updatedCount] = await User.update(
    { avatarURL },
    { where: { id: user.id } }
  );

  if (updatedCount === 0) {
    await filesServices.removeFile(avatarURL);
    throw HttpError(404);
  }

  if (prevAvatarURL) {
    await filesServices.removeFile(prevAvatarURL);
  }

  return { avatarURL };
};

export const usersServices = {
  changeSubscription,
  updateAvatar,
};
