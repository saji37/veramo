
import express from "express";
// @ts-ignore
import { createDid } from "../core/coreService.ts";
// @ts-ignore
import { createUser, findUser } from "./verifierDatabase.ts";
export const router = express.Router();



    router.post('/signup',async (req: { body: { name:any,email: any; password: any } },res: any) =>{
        // console.log(req.body)
        const {name,email,password} = req.body
        try {
            const did=await createDid()
           const newUser= await createUser(name,email,password,did.did)
            res.json({result:"Verifier Sign Up successfull",user:newUser})
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

    router.post('/accept-connection/:id',(req: any ,res: any) =>{
        try {
            res.json({result:"Connection Established..."})
        } catch (error) {
            res.json({result:"Error ..."})
        }
    })
    router.post('/verify-vc/:id',(req: any ,res: any) =>{
        try {
            res.json({result:"VC is verified..."})
        } catch (error) {
            res.json({result:"Error ..."})
        }
    })
    
 export default router;