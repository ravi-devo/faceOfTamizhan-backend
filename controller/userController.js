const User = require('../model/userModel');
const generateToken = require('../utils/generateToken');

const userController = {
    register: async (req, res) => {
        const { email, name, password } = req.body;
        const userExists = await User.findOne({ email });

        if(userExists){
            res.status(404).json({ message: `User with ${email} already exists, please login with the user account.`})
        }

        const user = User.create({
            name,
            email,
            password
        });

        //Checking if the user is created or not.
        if(user){
            generateToken(res, user._id);
            res.status(201).json({message: `User registered successfully.`});
        }else{
            res.status(400).json({message: `Invalid user data.`})
        }
    }
}

module.exports = userController;