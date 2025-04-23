import { Contact } from "../db/models/index.js";

const listContacts = async (user) => {
  const contacts = await Contact.findAll({ where: { ownerId: user.id } });
  return contacts;
};

const getContactById = async (contactId, user) => {
  const contact = await Contact.findOne({
    where: { id: contactId, ownerId: user.id },
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
    ownerId: user.id,
  });
  return newContact;
};

const updateContact = async (contactId, body, user) => {
  await Contact.update(body, { where: { id: contactId, ownerId: user.id } });
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
