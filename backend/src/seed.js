const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./schema/user.schema");
require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`
  )
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const users = [
  {
    name: "Alice",
    email: "alice@example.com",
    password: "password123",
  },
  {
    name: "Bob",
    email: "bob@example.com",
    password: "password123",
  },
  {
    name: "Charlie",
    email: "charlie@example.com",
    password: "password123",
  },
];

const seedDB = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    // Hash passwords and insert users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 8);
      user.password = hashedPassword;
      await User.create(user);
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedDB();
