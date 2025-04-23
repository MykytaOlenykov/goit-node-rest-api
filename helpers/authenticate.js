import { jwt } from "./jwt.js";
import { HttpError } from "./HttpError.js";
import { User } from "../db/models/index.js";

export const authenticate = async (req, _, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw HttpError(401);
    }

    const { id } = jwt.verify(token);

    if (!id) {
      throw HttpError(401);
    }

    const user = await User.findOne({ where: { id } });

    if (!user || !user.token || user.token !== token) {
      throw HttpError(401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
