 import Joi from 'joi';
 
 export const  signUpSchema=Joi.object({
  name:Joi.string().min(3).max(10).required(),
  email:Joi.string().email().required(),
 })