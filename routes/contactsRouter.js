import express from "express";

import { contactsControllers } from "../controllers/contactsControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { authenticate } from "../helpers/authenticate.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsControllers.getAllContacts);

contactsRouter.get("/:id", authenticate, contactsControllers.getOneContact);

contactsRouter.delete("/:id", authenticate, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updateContactStatusSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
