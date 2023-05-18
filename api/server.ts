// const express = require('express');
import express from 'express'

import dotenv from 'dotenv'
// @ts-ignore
import HolderRoutes from './holder/holderRoute.ts'
// @ts-ignore
import issuerRoutes from './issuer/issuerRoute.ts'
// @ts-ignore
import verifierRoutes from './verifier/verifierRoute.ts'
import { checkDbExists } from './core/coreDatabase.js'

const app = express();
dotenv.config();


const port = process.env.PORT || 4000;
app.use(express.json())

//*Checking wheather db exists and if it doesnot exist, Creating new one.. Make sure you have created username and password

checkDbExists();

app.use("/holder", HolderRoutes)
app.use("/issuer",issuerRoutes)
app.use("/verifier",verifierRoutes)



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});