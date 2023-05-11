import { signIn, signUp } from "./holderService";

import express from "express";
export const router = express.Router();



    router.post('/signup',signUp)
    router.post('/signin',signIn)

    
 module.exports={router}
