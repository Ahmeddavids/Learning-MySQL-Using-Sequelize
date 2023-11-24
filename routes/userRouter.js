import express from "express";
import {getAllStudent, registerStudent, studentLogin } from "../controller/studentController.js";
import { authenticate } from "../utils/authentication.js";

const Router = express.Router();

Router.get('/', (req, res) => {
    res.send('Welcome to Power Sector')
})

Router.post('/register', registerStudent);

Router.post('/login', studentLogin);

Router.get('/all', authenticate, getAllStudent);

export default Router;
