const User = require('../model/userModel');
const generateToken = require('../utils/generateToken');

const userController = {
    register: async (req, res) => {
        const { email, firstName, lastName, password, city, country } = req.body;
        const userExists = await User.findOne({ email });

        const name = `${firstName} ${lastName}`;
        const place = `${city}, ${country}`;
        const initial = `${firstName.charAt(0)}${lastName.charAt(0)}`;

        if(userExists){
            return res.status(404).json({ message: `User with ${email} already exists, please login with the user account.`})
        }

        const user = await User.create({
            name,
            email,
            initial,
            password,
            place
        });

        //Checking if the user is created or not.
        if(user){
            const token = await generateToken(res, user._id);
            res.status(201).json({message: `User registered successfully`, data: user, token});
        }else{
            res.status(400).json({message: `Invalid user data.`})
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(user && (await user.matchPassword(password))){
            const token = await generateToken(res, user._id);
            res.status(201).json({ message: `User authenticated successfully`, data: user, token})
        }else{
            res.status(401).json({ message: `Invalid email or password.`});
        }
    },
    logOut: async (req, res) => {
        try {
            res.status(200).json({message: `Logout successful.`})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController;