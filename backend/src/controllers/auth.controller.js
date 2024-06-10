const User = require("../schema/user.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Registration successful",
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
