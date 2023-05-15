
import express from "express";
// @ts-ignore
import { createDid } from "../core/coreService.ts";
// @ts-ignore
import { createUser, findUser } from "./issuerDatabase.ts";
export const router = express.Router();



    router.post('/signup',async (req: { body: { name:any,email: any; password: any } },res: any) =>{
        const {name,email,password} = req.body
        try {
            const did=await createDid()
            createUser(name,email,password,did.did)
            res.json({result:"Issuer Sign Up successfull"})
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

    router.post('/create-vc',(req: any,res: any) =>{
     
        try {
            res.json({result:"Credentials created ..."})
        } catch (error) {
            res.json({result:"Error Occured ..."})
        }
    })

    
export default router;