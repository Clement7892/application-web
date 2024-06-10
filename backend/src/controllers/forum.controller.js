const Message = require("../schema/message.schema");

exports.createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { id, name } = req.user;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
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

exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const { userId } = req.user;

    const message = await Message.findById(id);

    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    if (message.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    message.content = content;
    await message.save();

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const message = await Message.findById(id);

    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    if (message.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await message.remove();

    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
