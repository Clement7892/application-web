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
    const { userId } = req.user; // Obtenez l'ID de l'utilisateur à partir du JWT

    // Recherchez le message dans la base de données par son ID
    const message = await Message.findById(id);

    // Vérifiez si le message existe
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    // Vérifiez si l'utilisateur actuel est l'auteur du message
    if (message.userId.toString() !== userId) {
      // Si l'ID de l'utilisateur du message ne correspond pas à l'ID de l'utilisateur actuel, renvoyez une erreur d'authentification
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Mettez à jour le contenu du message
    message.content = content;
    // Enregistrez les modifications dans la base de données
    await message.save();

    // Répondez avec succès et renvoyez le message mis à jour
    res.status(200).json({ success: true, message });
  } catch (error) {
    // Gérez les erreurs et renvoyez un message d'erreur approprié
    console.error("Error updating message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    const message = await Message.findById(id);

    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    if (message.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Message.deleteOne({ _id: id });

    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
