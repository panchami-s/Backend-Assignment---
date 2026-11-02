const { getDB } = require("../config/db");

const createProfile = async (profile) => {
    return await getDB().collection("profiles").insertOne(profile);
};
const findProfile = async (userId) => {
    return await getDB().collection("profiles").findOne({
        userId
    });
};
const updateProfile = async (userId, data) => {
    return await getDB().collection("profiles").updateOne(
        { userId },
        { $set: data }
    );
};
const deleteProfile = async (userId) => {
    return await getDB().collection("profiles").deleteOne({
        userId
    });
};
module.exports = {
    createProfile,
    findProfile,
    updateProfile,
    deleteProfile
}; 