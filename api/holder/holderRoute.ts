
import express from "express";
// @ts-ignore
import { createDid } from "../core/coreService.ts";
// @ts-ignore
import { createUser, establishConnection, findUser, insertData, listConnection, listCredential } from "./holderDatabase.ts";

const router = express.Router();

    router.post('/signup',async (req: { body: { email: any; password: any } },res: any) =>{
        // console.log(req.body)
        const {email,password}=req.body
        try {
            const did=await createDid()
            // console.log(did.did)
            const user=await createUser(email,password,did.did)
            res.json({result:"Holder Sign Up successfull", user:user})
        } catch (error) {
            res.json({result:"Sign Up unsuccessfull"})
        }
        
    })
    router.post('/signin',async (req: { body: { email: any; password: any } },res: any) =>{
        console.log(req.body)
        const {email,password} = req.body  
        try {
            const user=await findUser(email,password)
            res.json({result:"Verifier Sign In successfull",user:user})
        } catch (error) {
            res.json({result:"Sign In unsuccessfull"})
        }
    })
    router.post('/accept-connection',async (req: any ,res: any) =>{
        try {
            const {holderid,issuerid} = req.body;
            console.log(req.body)
            const connection=await establishConnection(holderid,issuerid)
            res.json({result:"Connection Established ...",connection:connection})
        } catch (error) {
            res.json({result:"Connection not Established ..."})
        }
    })

    router.post('/accept-credentials/:id',(req: any ,res: any) =>{
        try {
            res.json({result:"Credential added to wallet..."})
        } catch (error) {
            res.json({result:"claim declined..."})
        }
    })

    router.post('/connection',(req: any ,res: any) =>{
        try {
            res.json({result:"Connection request sent to the issuer..."})
        } catch (error) {
            res.json({result:"Error ..."})
        }
    })
    router.post('/send-vc',(req:  {body: { vc: any; }},res: any) =>{
        try {
            res.json({result:"VC sent to the issuer..."})
        } catch (error) {
            res.json({result:"Error ..."})
        }
    })
    router.post('/list-connections/:id',async (req: any ,res: any) =>{
        try {
            const {id}= req.params;
            // console.log(id)
            const connections= await listConnection(id)
            res.json({result:"Connection request sent to the issuer...",Connections : connections})
        } catch (error) {
            res.json({result:"Error ..."})
        }
    })
    router.post('/list-credentials/:id',async (req: any ,res: any) =>{
        try {
            const {id}= req.params;
            // console.log(id)
            const credentials= await listCredential(id)
            res.json({result:"Credentials Found ...",Credentials : credentials})
        } catch (error) {
            res.json({result:"Error ..."})
        }
    })



    export default router;