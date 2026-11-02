const { getDB } = require("../config/db");

const createUser = async (user) => {
    return await getDB().collection("users").insertOne(user);
};

const findUser = async (value) => {
    return await getDB().collection("users").findOne({
        $or: [
            { email: value },
            { username: value }
        ]
    });
};

const checkUser = async (email, username) => {
    return await getDB().collection("users").findOne({
        $or: [
            { email },
            { username }
        ]
    });
};

const updateUser = async (email, data) => {
    return await getDB().collection("users").updateOne(
        { email },
        { $set: data }
    );
};

module.exports = {
    createUser,
    findUser,
    checkUser,
    updateUser
};