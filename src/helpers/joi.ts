import Joi from "joi";

const aditingSchema = Joi.object({
  email: Joi.string().min(6).email(),
  name: Joi.string().min(6),
  age: Joi.number(),
});

const addetUserSchema = Joi.object({
  password: Joi.string().max(10).min(6).required(),
  email: Joi.string().min(6).required().email(),
  name: Joi.string().min(6).required(),
  age: Joi.number().required(),
});

export { aditingSchema, addetUserSchema };
