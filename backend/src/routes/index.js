const express = require("express");
const productRoute = require("./product.route");
const authRouter = require("./auth.route");
const forumRoutes = require("./forum.route");
const paymentRoutes = require("./stripe.route");

const router = express.Router();

router.use("/products", productRoute);
router.use("/auth", authRouter);
router.use("/forum", forumRoutes);
router.use("/stripe", paymentRoutes);

module.exports = router;
