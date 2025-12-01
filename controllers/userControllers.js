import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const loginUser = async (req,res) =>{
    const {email, password, username} = req.body ?? {};
    try {
        const isExist =  email ? await User.findOne({email}) : await User.findOne({username});
        if(!isExist) return res.status(404).json({
            status: 'error',
            data: 'user doesn\'t exist'
        });
        
        const pass = bcrypt.compareSync(password, isExist.password);
        if(!pass) return res.status(400).json({
            status: 'error',
            data: 'invalid credential'
        });

        const token = jwt.sign({
            id:isExist.id,
            role:isExist.role
        }, 'secret');


        return res.status(200).json({
            status: 'success',
            data: {token,
            role:isExist.role
            }
         });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            data: err.message
        })
    }
}

export const registerUser = async (req,res) =>{
    const {email, password, username} = req.body ?? {};
    try {
        const hasPass = bcrypt.hashSync(password, 10);
        await User.create({
            username,
            email,
            password:hasPass
        });

        return res.status(201).json({
            status: 'success',
            data: 'user successfully registered'
        })


    } catch (err) {
        return res.status(400).json({
            status: 'error',
            data: err.message
        })
    }
}