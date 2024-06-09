const Product = require("../schema/product.schema");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.json({
        code: 404,
        message: "Product not found",
      });
    }

    return res.json({
      message: "Success",
      code: 200,
      data: {
        products,
      },
    });
  } catch (err) {
    console.log(`erreur : ${err}`);
    return res.json({
      message: "Failed to retrieves products",
      code: 400,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Id is required",
      });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.error("Error fetching product details:", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
