const express = require("express");
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
} = require("../controllers/forum.controller");
const auth = require("../middlewares/auth");

router.get("/messages", getAllMessages);
router.post("/messages", auth, createMessage);
router.put("/messages/:id", auth, updateMessage);
router.delete("/messages/:id", auth, deleteMessage);

module.exports = router;
