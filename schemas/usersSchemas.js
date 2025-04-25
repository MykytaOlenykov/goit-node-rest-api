import Joi from "joi";

import { userSubscriptions } from "../constants/users.js";

export const changeSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(userSubscriptions))
    .required(),
});
