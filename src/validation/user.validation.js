/* eslint-disable linebreak-style */

import Joi from '@hapi/joi';

function signupvalidation(data) {
  const schema = {
    email: Joi.string().min(4).required().email(),
    first_name: Joi.string().min(4).required(),
    last_name: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
    address: Joi.string().min(2).required(),
  };
  return Joi.validate(data, schema);
}
export default signupvalidation;
