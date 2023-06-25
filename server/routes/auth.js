 const router = require("express").Router()
const { model } = require("mongoose")
const User = require("../models/Users")
 const bcrypt = require("bcrypt")



///signUp
router.post("/signup", async(req,res)=>{

    try{
        //// hashing user password
       const salt =  await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(req.body.password,salt)
       const newUser = new User({

           name:req.body.name,
           email:req.body.email,
           password:hashedPassword
       });
        const user = await newUser.save()
        res.status(200).json(user)

    }catch(err){
     
        res.status(500).json(err)
    }

})

//Login

router.post('/login', async(req,res)=>{
    try{
       const user = await User.findOne({name:req.body.name})
       if(!user) {return res.json("Wrong user name or password")}

       const validatedPassword = await bcrypt.compare(req.body.password,user.password)
       if(!validatedPassword )
       {return  res.json("Wrong user name or password" )} 

       const {password, ...others} = user._doc
       res.status(200).json(others)
       
    
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router