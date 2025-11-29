import User from "../models/User.js"


export const loginUser = (req,res) =>{

}

export const registerUser = async (req,res) =>{
    const {email, password, username} = req.body ?? {};
    try {
        await User.create({
            username,
            email,
            password
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