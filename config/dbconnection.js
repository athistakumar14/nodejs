const mongoose = require("mongoose");
const URL = "mongodb://0.0.0.0:27017/usercollection";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(URL, { useNewUrlParser: true });
    console.log(`Mongo DB Connected: ${connect.connection.host} ${connect.connection.name}`);
  } catch (error) {
    console.log(error, "error");
    process.exit(1);
  }
};


module.exports = connectDb;
