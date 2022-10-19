import Joi from 'joi';

/** ----- USer Register validation ----- */
export const userRegisterValidation = Joi.object().keys({
  name: Joi.string().required().label('Name is required'),
  phone: Joi.number().required().label('Phone number is required'),
  password: Joi.string().required().label('Password is required'),
  isVerified: Joi.boolean(),
});

/** ----- USer Login validation ----- */

export const userLoginValidation = Joi.object().keys({
  phone: Joi.number().required().label('Phone number is required'),
  password: Joi.string().required().label('Password is required'),
});
