const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const URL = "mongodb://0.0.0.0:27017/usercollection";
const MongoClient = require("mongodb").MongoClient;

const getUser = asyncHandler(async (req, res) => {
  try {
    const client = await MongoClient.connect(URL);
    const db = client.db("usercollection");
    const collection = db.collection("users");
    const users = await collection.find({}).toArray();
    res.status(200).json({ data: users, count: users.length });
  } catch (err) {
    console.error(
      "An error occurred while fetching data from the collection:",
      err
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error("All fields are mandatory..");
  }
  const user = await User.create({
    name,
    email,
  });
  res.status(201).json({ message: "user created successfully", user: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  const id = req.params.id;
  const user = await User.findById(id);
  if (!email || !name) {
    res.send(400);
    throw new Error("All fields are mandatory..");
  }
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.send(200).json({ mesage: "User Updated successfully", user: updateUser });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const deleteUser = await User.deleteOne({_id : id});
  res.send(200).json({ message: "user deleted successfully" });
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const findUser = await User.findById(id);
  if (!findUser) {
    res.status(404).json({message:"user not found"})
  }
  res.status(200).json({data : findUser})
});
module.exports = { getUser, createUser, updateUser, deleteUser, getUserById };
