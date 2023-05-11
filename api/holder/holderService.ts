

export const signUp=(req: { body: { email: any; password: any } },res: any) =>{
    console.log(req.body)
    try {
        res.json({result:"Holder Sign Up successfull"})
    } catch (error) {
        res.json({result:"Sign Up unsuccessfull"})
    }
    
}

export const signIn=(req: { body: { email: any; password: any } },res: any) =>{
    console.log(req.body)
    const {email,password} = req.body  
    try {
        res.json({result:"Holder Sign In successfull"})
    } catch (error) {
        res.json({result:"Sign In unsuccessfull"})
    }
}
