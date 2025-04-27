import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().min(4).max(255).required(),
  password: Joi.string().min(6).max(255).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().min(4).max(255).required(),
  password: Joi.string().min(6).max(255).required(),
});

export const resendVerificationEmailSchema = Joi.object({
  email: Joi.string().email().min(4).max(255).required(),
});
