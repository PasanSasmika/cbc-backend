import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv  from "dotenv";
import axios from "axios";

dotenv.config()



export function creatUser(req,res){

const newUserData = req.body


if(newUserData.type == "admin"){

    if(req.user==null){
        res.json({
            message: "You are not loged in. plese log in as an admin to create admin account"
        })
        return
    }

    if(req.user.type !="admin"){
        res.json({
            message: "You are not an admin. plese log in as an admin"
        })
    }
}



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


export function createCustomer(req, res) {
    const newUserData = req.body;

    // Ensure no validation error for customer registration (e.g. same email already exists)
    User.findOne({ email: newUserData.email })
        .then(existingUser => {
            if (existingUser) {
                return res.json({
                    message: "A user with this email already exists."
                });
            }

            // Hash the password before saving it to the database
            newUserData.password = bcrypt.hashSync(newUserData.password, 10);

            // Create the new user
            const user = new User(newUserData);

            // Save the user to the database
            user.save()
                .then(() => {
                    res.json({
                        message: "Registration successfully"
                    });
                })
                .catch(err => {
                    console.error("Error creating user:", err); // Log error in the console
                    res.json({
                        message: "Customer user not created"
                    });
                });
        })
        .catch(err => {
            console.error("Error checking email:", err); // Log error in the console
            res.json({
                message: "Error occurred while checking email",
                error: err
            });
        });
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
                }, process.env.SECRET)
                    res.json({
                        message: "Logged in successful",
                        token: token,
                        user: {
                            firstName : user.firstName,
                            lastName : user.lastName,
                            email: user.email,
                            profilepic: user.profilepic,
                            type : user.type
                        }
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

export function isAdmin(req){

    if(req.user==null){
        return false
    }

    if(req.user.type != "admin"){
        return false
    }

    return true
}

export function isCustomer(req){

    if(req.user==null){
        return false
    }

    if(req.user.type != "customer"){
        return false
    }

    return true

}


export async function googleLogin(req,res) {

    const token = req.body.token

    try{
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const email = response.data.email

        const usersList = await User.find({email: email})
        if(usersList.length >0){

            const user = usersList[0]
            const token = jwt.sign({
                email : user.email,
                firstName : user.firstName,
                lastName : user.lastName,
                isBlocked : user.isBlocked,
                type : user.type,
                profilepic : user.profilepic
            }, process.env.SECRET)

            res.json({
                message: "User lodded in",
                token: token,
                user :{
                    firstName : user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                    profilepic: user.profilepic,
                    email : user.email
                }
            })
        } else{

            //create new user

            const newUserData ={
                email : email,
                firstName : response.data.given_name,
                lastName : response.data.family_name,
                type : "customer",
                password : "ffffff",
                profilepic: response.data.picture
            }

            const user = new User(newUserData)
            user.save().then(()=>{
                res.json({
                    message: "User created"
                })
            }).catch((error)=>{
                res.json({
                    message: "User not created"
                })
            })
        }

    }catch(e){
        console.log(e)
        res.json({
            message: "Google login failed"
        })
    }
    
}


export async function getUser(req,res){
    if(req.user==null){
        res.status(404).json({
            message: "Please login to view user detaile"
        })
        return
    }
    res.json(req.user)
}


export function logOut(req,res){
    res.clearCookie("token");
    res.json({
        message:"User Loged out Successfully...!"
    })
}


export async function getAllUsers(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message: "Please login as an admin to view users...!" 
        })
        return
    }
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
}