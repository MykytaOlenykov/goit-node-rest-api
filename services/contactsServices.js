import { Contact } from "../db/models/index.js";

const listContacts = async () => {
  const contacts = await Contact.findAll();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ where: { id: contactId } });
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findOne({ where: { id: contactId } });

  if (!contact) return null;

  await Contact.destroy({ where: { id: contactId } });

  return contact;
};

const addContact = async (name, email, phone) => {
  const newContact = await Contact.create({ name, email, phone });
  return newContact;
};

const updateContact = async (contactId, body) => {
  await Contact.update(body, { where: { id: contactId } });
  const contact = await getContactById(contactId);
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await updateContact(contactId, body);
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
