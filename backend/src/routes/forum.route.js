const express = require("express");
const router = express.Router();
const {
  createMessage,
  getAllMessages,
} = require("../controllers/forum.controller");
const auth = require("../middlewares/auth");

router.post("/messages", auth, createMessage);
router.get("/messages", getAllMessages);

module.exports = router;
