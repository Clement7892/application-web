const express = require("express");
const productRoute = require("./product.route");
const authRouter = require("./auth.route");
const forumRoutes = require("./forum.route");
const router = express.Router();

router.use("/products", productRoute);
router.use("/auth", authRouter);
router.use("/forum", forumRoutes);

module.exports = router;
