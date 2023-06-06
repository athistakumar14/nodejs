const express = require("express");
const { createUser, getUser, updateUser, deleteUser , getUserById} = require("../controllers/userController");
const router = express.Router();

router.route("/user").get(getUser).post(createUser)
router.route("/user/:id").get(getUserById).put(updateUser).delete(deleteUser)
module.exports = router;