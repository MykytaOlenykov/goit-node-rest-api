import fs from "node:fs/promises";
import path from "node:path";

import { sequelize } from "./sequelize.js";
import { User, Contact } from "./models/index.js";
import { hashSecret } from "../helpers/hashing.js";
import { settings } from "../settings.js";

const contactsPath = path.resolve("db", "contacts.json");

const seedUser = async () => {
  const password = await hashSecret("123456");
  const user = { email: "mango@gmail.com", password };
  return await User.create(user);
};

const seedContacts = async (ownerId) => {
  const contacts = await fs.readFile(contactsPath);
  const preparedContacts = JSON.parse(contacts).map((contact) => ({
    ...contact,
    owner: ownerId,
  }));
  await Contact.bulkCreate(preparedContacts);
};

export const syncSequelize = async () => {
  if (settings.env !== "development") return;

  await sequelize.sync({ force: true });

  const user = await seedUser();
  await seedContacts(user.id);
};
