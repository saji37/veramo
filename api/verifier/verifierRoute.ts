import { signIn, signUp } from "./verifierService";

import express from "express";
export const router = express.Router();



    router.post('/signup',signUp)
    router.post('/signin',signIn)

    
 module.exports={router}