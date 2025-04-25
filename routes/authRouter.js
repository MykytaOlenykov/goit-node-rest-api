import express from "express";

import { authControllers } from "../controllers/authControllers.js";
import { usersControllers } from "../controllers/usersControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { authenticate } from "../helpers/authenticate.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import { changeSubscriptionSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authControllers.register
);

authRouter.post("/login", validateBody(loginSchema), authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.current);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(changeSubscriptionSchema),
  usersControllers.changeSubscription
);

export default authRouter;
