// const express = require('express');
import express from 'express'

import dotenv from 'dotenv'
// @ts-ignore
import HolderRoutes from './holder/holderRoute.ts'
// @ts-ignore
import issuerRoutes from './issuer/issuerRoute.ts'
// @ts-ignore
import verifierRoutes from './verifier/verifierRoute.ts'

dotenv.config();

const app = express();
const port = 4000;
app.use(express.json())

app.use("/holder", HolderRoutes)
app.use("/issuer",issuerRoutes)
app.use("/verifier",verifierRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});