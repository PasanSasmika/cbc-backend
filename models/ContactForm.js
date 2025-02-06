import mongoose from "mongoose";

const contactFormSchema = mongoose.Schema({
    contactId : {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), // Auto-generated
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

    subject:{
        type: String,
        required: true
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