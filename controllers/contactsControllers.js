import { contactsService } from "../services/contactsServices.js";
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { contacts, total } = await contactsService.listContacts(
    req.query,
    req.user
  );
  res.status(200).json({ data: { contacts, total } });
};

const getOneContact = async (req, res) => {
  const { id } = req.params;

  const contact = await contactsService.getContactById(id, req.user);

  if (!contact) throw HttpError(404);

  res.status(200).json({ data: { contact } });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const contact = await contactsService.removeContact(id, req.user);

  if (!contact) throw HttpError(404);

  res.status(200).json({ data: { contact } });
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const contact = await contactsService.addContact(
    name,
    email,
    phone,
    req.user
  );

  res.status(201).json({ data: { contact } });
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const contact = await contactsService.updateContact(id, req.body, req.user);

  if (!contact) throw HttpError(404);

  res.status(200).json({ data: { contact } });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsService.updateStatusContact(
    contactId,
    req.body,
    req.user
  );

  if (!contact) throw HttpError(404);

  res.status(200).json({ data: { contact } });
};

export const contactsControllers = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
