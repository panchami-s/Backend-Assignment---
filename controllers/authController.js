const crypto = require("crypto");

const {
    createUser,
    findUser,
    checkUser,
    updateUser
} = require("../models/userModel");

const hashPassword = (password, salt) => {
    return crypto.scryptSync(password, salt, 64).toString("hex");
};


// Signup

const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            username,
            password,
            gender,
            mobile,
            address
        } = req.body;

        const existingUser = await checkUser(email, username);

        if (existingUser) {
            return res.status(409).json({
                message: "Email or username already exists"
            });
        }

        const salt = crypto.randomBytes(16).toString("hex");

        const hashedPassword = hashPassword(password, salt);

        const user = {
            name,
            email,
            username,
            password: hashedPassword,
            salt,
            gender,
            mobile,
            address
        };

        await createUser(user);

        res.status(201).json({
            message: "Signup successful"
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Login

const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const value = email || username;

        const user = await findUser(value);

        if (!user) {
            return res.status(401).json({
                message: "Email or password is wrong"
            });
        }

        const hashedPassword = hashPassword(password, user.salt);

        const passwordMatch = crypto.timingSafeEqual(
            Buffer.from(hashedPassword, "hex"),
            Buffer.from(user.password, "hex")
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Email or password is wrong"
            });
        }

        const token = crypto.randomBytes(32).toString("hex");

        await updateUser(user.email, {
            token: token
        });

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    signup,
    login
};