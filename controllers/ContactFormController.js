import ContactForm from "../models/ContactForm.js"
import { isCustomer } from "./userController.js"



export  function createContact(req,res){

    if(!isCustomer(req)){
        res.json({
            message: "Please login to contact..!" 
        })
        return
    }

    const newContactData= req.body

    const contactForm = new ContactForm(newContactData)

    contactForm.save().then(()=>{
        res.json({
            message: "Message added..!"
        })
    }).catch((error)=>{
        console.log(error)
        res.status(403).json({
            message: error
        })
    })

}