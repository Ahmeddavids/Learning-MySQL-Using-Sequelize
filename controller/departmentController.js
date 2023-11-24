import { Department } from "../models/departments.js";

export const createDeparment = async (req, res) => {
    try {
        const departmentExists = await Department.findOne({ where: { name: req.body.name } });
        console.log(departmentExists);
        if (departmentExists) {
            return res.status(400).json({
                message: `Department already exists`
            })
        } else {
            const newDepartment = await Department.create({
                name: req.body.name
            })

            res.status(201).json({
                message: `Department Created Successfully`,
                data: newDepartment
            })

        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
