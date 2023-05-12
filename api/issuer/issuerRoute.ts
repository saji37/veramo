
import express from "express";
export const router = express.Router();



    router.post('/signup',(req: { body: { email: any; password: any } },res: any) =>{
        console.log(req.body)
        try {
            res.json({result:"Issuer Sign Up successfull"})
        } catch (error) {
            res.json({result:"Sign Up unsuccessfull"})
        }
        
    })

    router.post('/signin',(req: { body: { email: any; password: any } },res: any) =>{
        console.log(req.body)
        const {email,password} = req.body  
        try {
            res.json({result:"Issuer Sign In successfull"})
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

    
 module.exports={router}