const Message = require("../schema/message.schema");

exports.createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { id, name } = req.user;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content are required",
      });
    }

    const message = new Message({
      userId: id,
      content,
      username: name,
    });

    await message.save();

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Error getting messages:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
