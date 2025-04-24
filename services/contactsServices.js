import { Contact, User } from "../db/models/index.js";
import { getOffset } from "../helpers/getOffset.js";

const listContacts = async (query, user) => {
  const { page = 1, limit = 100, favorite } = query;

  const { rows, count } = await Contact.findAndCountAll({
    where: {
      owner: user.id,
      ...(typeof favorite === "boolean" ? { favorite } : {}),
    },
    limit: limit,
    offset: getOffset(page, limit),
    order: [["id", "DESC"]],
  });

  return { contacts: rows, total: count };
};

const getContactById = async (contactId, user) => {
  const contact = await Contact.findOne({
    where: { id: contactId, owner: user.id },
  });
  return contact;
};

const removeContact = async (contactId, user) => {
  const contact = await getContactById(contactId, user);

  if (!contact) return null;

  await Contact.destroy({ where: { id: contactId } });

  return contact;
};

const addContact = async (name, email, phone, user) => {
  const newContact = await Contact.create({
    name,
    email,
    phone,
    owner: user.id,
  });
  return newContact;
};

const updateContact = async (contactId, body, user) => {
  await Contact.update(body, { where: { id: contactId, owner: user.id } });
  const contact = await getContactById(contactId, user);
  return contact;
};

const updateStatusContact = async (contactId, body, user) => {
  const contact = await updateContact(contactId, body, user);
  return contact;
};

export const contactsService = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
