import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  email: Joi.string().email().min(4).max(255).required(),
  phone: Joi.string().min(2).max(50).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(4).max(255).optional(),
  email: Joi.string().email().min(4).max(255).optional(),
  phone: Joi.string().min(2).max(50).optional(),
}).or("name", "email", "phone");
