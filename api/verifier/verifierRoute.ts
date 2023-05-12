
import express from "express";
export const router = express.Router();



    router.post('/signup',(req: { body: { email: any; password: any } },res: any) =>{
        console.log(req.body)
        try {
            res.json({result:"Verifier Sign Up successfull"})
        } catch (error) {
            res.json({result:"Sign Up unsuccessfull"})
        }
        
    })
    router.post('/signin',(req: { body: { email: any; password: any } },res: any) =>{
        console.log(req.body)
        const {email,password} = req.body  
        try {
            res.json({result:"Verifier Sign In successfull"})
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
    
 module.exports={router}