import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function creatUser(req,res){

const newUserData = req.body

newUserData.password = bcrypt.hashSync(newUserData.password, 10)


const user  = new User(newUserData)

user.save().then(()=>{
    res.json({
        message: "User created"
    })
}).catch(()=>{
    res.json({
        message: "User not created"
    })
})

}

export function loginUser(req,res){

    User.find({email: req.body.email}).then(
        (users)=>{
            if(users.length == 0){
                res.json({
                    message: "User not found"
                })
            }else {

                const user = users[0]

               const isPasswordCorrect =  bcrypt.compareSync(req.body.password, user.password)

               if(isPasswordCorrect){
                const token = jwt.sign({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilepic: user.profilepic
                }, "cbc-screat-key-1111")
                    res.json({
                        message: "Logged in successful",
                        token: token
                    })

               }else{
                res.json({
                    message: "Your Password Is not correct"
                })
               }
            }
        }
    )
}

