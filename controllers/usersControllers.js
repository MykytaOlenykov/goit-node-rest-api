import { usersService } from "../services/usersService.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const changeSubscription = async (req, res) => {
  const user = await usersService.changeSubscription(req.body, req.user);
  res.status(200).json({ data: { user } });
};

export const usersControllers = {
  changeSubscription: ctrlWrapper(changeSubscription),
};
