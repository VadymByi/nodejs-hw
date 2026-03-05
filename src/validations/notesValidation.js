import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

const noteIdJoi = Joi.object({
  noteId: Joi.string().custom(objectIdValidator).required(),
});

export const bodySchema = Joi.object({
  title: Joi.string().min(1).required().messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title should have at least 1 character',
    'any.required': 'Title is required',
  }),
  content: Joi.string().allow('').messages({
    'string.base': 'Content must be a string',
  }),
  tag: Joi.string()
    .valid(...TAGS)
    .messages({
      'string.base': 'Tag must be a string',
      'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
    }),
});

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
      }),
    search: Joi.string().trim().allow('').messages({
      'string.base': 'Search query must be a string',
    }),
    sortBy: Joi.string().valid('_id', 'title', 'tag'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: noteIdJoi,
};

export const createNoteSchema = {
  [Segments.BODY]: bodySchema,
};

export const updateNoteSchema = {
  [Segments.PARAMS]: noteIdJoi,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least 1 character',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
      }),
  })
    .min(1)
    .messages({
      'object.min': 'Body must have at least one field',
    }),
};
