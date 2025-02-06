import express from 'express';
import { createContact } from '../controllers/ContactFormController.js';


const contactRoute = express.Router();

contactRoute.post("/", createContact)






export default contactRoute;
