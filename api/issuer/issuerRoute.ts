import { signIn, signUp } from "./issuerService";

import express from "express";
export const router = express.Router();



    router.post('/signup',signUp)
    router.post('/signin',signIn)

    
 module.exports={router}