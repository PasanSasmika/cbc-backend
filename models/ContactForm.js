import mongoose from "mongoose";

const contactFormSchema = mongoose.Schema({
    contactId : {
        type : String,
        required: true,
        unique: true
    },

    name: {
        type : String,
        required : true
    },

    email: {
        type : String,
        required : true
    },

    message: {
        type : String,
        required : true
    },

    date : {
        type: Date,
        default: Date.now
    }

})

const ContactForm = mongoose.model("contactForm", contactFormSchema);

export default ContactForm;