const Joi = require("joi");

const validate = (stringValue) => {
  const stringSchema = Joi.string();
  const { error, value } = stringSchema.validate(stringValue);
  return { error, value };
};

module.exports = { validate }