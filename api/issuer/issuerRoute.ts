
import express from "express";
// @ts-ignore
import { createDid, createVc } from "../core/coreService.ts";
// @ts-ignore
import { addVc, createUser, findHolder, findUser } from "./issuerDatabase.ts";
import { Connection } from "pg";
export const router = express.Router();



    router.post('/signup',async (req: { body: { name:any,email: any; password: any } },res: any) =>{
        const {name,email,password} = req.body
        try {
            const did=await createDid()
            const newUser=await createUser(name,email,password,did.did)
            res.json({result:"Issuer Sign Up successfull",issuer:newUser})
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

    router.post('/connection',(req: any ,res: any) =>{
        console.log(req.body)
        const {id} = req.body  
        try {
            res.json({result:"Connection request sent ..."})
        } catch (error) {
            res.json({result:"Error Occured ..."})
        }
    })

    router.post('/offer-credentials/:id',(req: { body: { id: any; } },res: any) =>{
     
        try {
            res.json({result:"Credentials sent ..."})
        } catch (error) {
            res.json({result:"Error Occured ..."})
        }
    })

    router.post('/create-vc',async (req: {body:{connectionid:string,holderId:string,issuerDid:string,name:string,dob:string,address:string}},res: any) =>{
        const {connectionid,holderId,issuerDid,name,dob,address} = req.body;
        try {
            const holderDid=await findHolder(parseInt(holderId))
            const vc=await createVc(holderId,issuerDid,name,dob,address);
           const cred= await addVc(parseInt(connectionid),vc)
            res.json({result:"Credentials created ...",Credential:cred})
        } catch (error) {
            res.json({result:"Error Occured ..."})
        }
    })

    
export default router;