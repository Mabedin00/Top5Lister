const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    try{
        auth.verify(req, res, async function () {
            const loggedInUser = await User.findOne({ _id: req.userId });
            return res.status(200).json({
                loggedIn: true,
                user: {
                    firstName: loggedInUser.firstName,
                    lastName: loggedInUser.lastName,
                    email: loggedInUser.email,
                    username: loggedInUser.username
                }
            }).send();
        })
    }
    catch{
        return res.status(200).json({
            loggedIn: false
        }).send();
    }
    
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !username || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        const existingUser1 = await User.findOne({ username: username });
        if (existingUser1) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            firstName, lastName, email, username, passwordHash
        });
        const savedUser = await newUser.save();
        return res.status(200).json({
            success: true,
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const user = await User.findOne({ username: username });
        if (!user) {
            return res
                .status(400)
                .json({ errorMessage: "No account with this username exists." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ errorMessage: "Incorrect password." });
        }
        // LOGIN THE USER
        const token = auth.signToken(user);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username ,
                email: user.email,
                lists: user.lists
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    try {
        await res.clearCookie("token").status(200).json({
            success: true
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}