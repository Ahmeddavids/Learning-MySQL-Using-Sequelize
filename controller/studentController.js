import dotenv from 'dotenv';
dotenv.config()
import { Department } from "../models/departments.js";
import Student  from "../models/students.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const registerStudent = async (req, res) => {
    try {
        const { fullname, year, email, gender, password, department_id } = req.body;
        const userExists = await Student.findOne({ where: { email: email } });
        const departmentExists = await Department.findOne({ where: { id: department_id } })

        if (!departmentExists) {
            return res.status(400).json({
                message: `Department does not exists`
            })
        }

        if (userExists) {
            return res.status(400).json({
                message: `Student with email: ${email} already exists`
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = await Student.create({
            fullname: fullname,
            year: year,
            email: email,
            department_id: department_id,
            gender: gender,
            password: hashPassword
        });

        res.status(201).json({
            message: `Student registered successfully`,
            data: newUser
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Student.findOne({ where: {email: email } });

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const confirmPassword = bcrypt.compare(password, user.password);

        if(!confirmPassword){
            return res.status(400).json({
                message: 'Invalid password'
            })
        }
        console.log(process.env.JWT_SECRET);

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1 day'});

        user.save();

        res.status(200).json({
            status: 'Success',
            message: 'Login Successful',
            email: user.email,
            fullname: user.fullname,
            token
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getAllStudent = async (req, res) => {
    try {
        const allStudent = await Student.findAll();
        if(allStudent.length === null) {
            return res.status(200).json({
                message: 'There are no student currently in this database'
            })
        } else {
            res.status(200).json({
                status: 'Success',
                allStudent
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
