import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim().optional(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(8).required(),
  }),
};
