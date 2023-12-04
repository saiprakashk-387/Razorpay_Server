const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "your key id",
  key_secret: "your secret key",
});

app.get("/", (req, res) => res.send("Razorpay Server"));
app.get("/check", (req, res) => {
  res.json("Express.Js Razorpay server running ");
});

app.post("/createOrder", async (req, res) => {
  console.log("reqqq", req.body);
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount,
      currency: "INR",
    });
    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

// Endpoint for handling successful payments
app.post("/verifySignature", (req, res) => {
  const { orderID, transaction } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.SECRETKEY)
    .update(`${orderID}|${transaction.razorpay_payment_id}`)
    .digest("hex");

  res.send({
    validSignature: generatedSignature === transaction.razorpay_signature,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Razorpay Server listening at Port ${port}`)
);
