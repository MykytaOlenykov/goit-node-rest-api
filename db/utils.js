import fs from "node:fs/promises";
import path from "node:path";

import { sequelize } from "./sequelize.js";
import { Contact } from "./models.js";
import { settings } from "../settings.js";

const contactsPath = path.resolve("db", "contacts.json");

const seedContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  await Contact.bulkCreate(JSON.parse(contacts));
};

export const syncSequelize = async () => {
  if (settings.env !== "development") return;
  await sequelize.sync({ force: true });
  await seedContacts();
};
