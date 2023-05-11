// const express = require('express');
import express from 'express'
import dotenv from 'dotenv'
import {router as holderRouter} from './holder/holderRoute'
import {router as issuerRouter} from './issuer/issuerRoute'
import {router as verifierRouter} from './verifier/verifierRoute'

dotenv.config();

const app = express();
const port = 4000;
app.use(express.json())

app.use("/holder", holderRouter)
app.use("/issuer",issuerRouter)
app.use("/verifier",verifierRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});