import express from 'express'
import { validation } from '../../middleware/validation.js';
import {  signIn, signUp, verifyOTP } from './user.controller.js';
import { signUpSchema } from './user.validation.js';


let router=express.Router();


router.post('/signup',validation(signUpSchema),signUp);
router.post('/signin',signIn);
router.post('/verifyOTP',verifyOTP);




export default router
