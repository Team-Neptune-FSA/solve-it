const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51ItJE5Gf9BY78tq2mSr97YAR40HB2cIP1MilQiE3dJFPQ3fPFis0eulomjPSVV35H913YmIR57lN7LE13XNFVY6c00RztIBIg4"
);
module.exports = router;

router.use("/users", require("./users"));
router.use("/execute", require("./execute"));
router.use("/issues", require("./issues"));
router.use("/stats", require("./stats"));

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
