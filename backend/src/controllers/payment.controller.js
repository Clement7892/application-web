const Stripe = require("stripe");
const { stripeSecretKey } = require("../config");
const stripe = Stripe(stripeSecretKey);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Erreur lors de la création du PaymentIntent:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du PaymentIntent",
    });
  }
};
