
import express from "express";
export const router = express.Router();



    router.post('/signup',(req: { body: { email: any; password: any } },res: any) =>{
        console.log(req.body)
        try {
            res.json({result:"Holder Sign Up successfull"})
        } catch (error) {
            res.json({result:"Sign Up unsuccessfull"})
        }
        
    })
    router.post('/signin',(req: { body: { email: any; password: any } },res: any) =>{
        console.log(req.body)
        const {email,password} = req.body  
        try {
            res.json({result:"Holder Sign In successfull"})
        } catch (error) {
            res.json({result:"Sign In unsuccessfull"})
        }
    })
    router.post('/accept-connection/:id',(req: any ,res: any) =>{
        try {
            res.json({result:"Connection Established ..."})
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

 module.exports={router}
