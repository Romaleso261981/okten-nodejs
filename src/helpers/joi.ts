import Joi from "joi";

const signInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().min(6).email(),
  name: Joi.string().min(6),
  age: Joi.number(),
});

const signUpSchema = Joi.object({
  password: Joi.string().max(10).min(6).required(),
  email: Joi.string().min(6).required().email(),
  name: Joi.string().min(6).required(),
  age: Joi.number().required(),
});

export { signInSchema, signUpSchema };
