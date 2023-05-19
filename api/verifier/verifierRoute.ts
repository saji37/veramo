
import express from "express";
// @ts-ignore
import { createDid, verifyVc } from "../core/coreService.ts";
// @ts-ignore
import { checkIfExist, createUser, findUser, findVc } from "./verifierDatabase.ts";
export const router = express.Router();



    router.post('/signup',async (req: { body: { name:any,email: any; password: any } },res: any) =>{
        // console.log(req.body)
        const {name,email,password} = req.body
        try {
            const userExist = await checkIfExist(email);
      if (!userExist) {
            const did=await createDid()
           const newUser= await createUser(name,email,password,did.did)
            res.json({result:"Verifier Sign Up successfull",data:newUser})
        } else {
          res.json({ result: "Verifier already exists", data: userExist });
        }
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
    router.post('/verify-vc/:id',async (req: any ,res: any) =>{
        try {
            const {id}=req.params;
            const cred=await findVc(parseInt(id))
            const result=await verifyVc(cred?.vc)
            res.json({data:"VC is verified...",result:result})
        } catch (error) {
            res.json({result:"Error ..."})
        }
    })
    
 export default router;