const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

let db;
const connectDB = async () => {
    try {
        await client.connect();

        db = client.db("loginDB");

        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Error:", err.message);
        process.exit(1);
    }
};
const getDB = () => db;
module.exports = { connectDB, getDB };