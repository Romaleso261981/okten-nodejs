import Joi from "joi";

const aditingSchema = Joi.object({
  email: Joi.string().min(6).email(),
  name: Joi.string().min(6),
});

const addetUserSchema = Joi.object({
  password: Joi.string().max(10).min(6).required(),
  email: Joi.string().min(6).required().email(),
  name: Joi.string().min(6).required(),
});

export { aditingSchema, addetUserSchema };
