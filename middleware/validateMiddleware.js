const validateSignup = (req, res, next) => {
    const {
        name,
        email,
        username,
        password,
        rePassword,
        gender,
        mobile,
        address
    } = req.body;

    
    if (!name || !email || !username || !password ||
        !rePassword || !gender || !mobile ||
        !address?.lane1 || !address?.pincode) {
        return res.status(400).json({
            message: "All required fields are nessary to fill"
        });
    
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must contain at least 6 characters"
        });
    }

    if (password !== rePassword) {
        return res.status(400).json({
            message: "Passwords do not match"
        });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        return res.status(400).json({
            message: "Invalid mobile number"
        });
    }

    if (!/^[0-9]{6}$/.test(address.pincode)) {
        return res.status(400).json({
            message: "Invalid pincode"
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
        return res.status(400).json({
            message: "Email or username and password are required"
        });
    }

    if (email && username) {
        return res.status(400).json({
            message: "Enter either email or username"
        });
    }
    next();
};
module.exports = { validateSignup, validateLogin };