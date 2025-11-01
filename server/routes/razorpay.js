import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


router.post('/razorpay', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_order_${Math.random()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
            order_id: order.id,
            currency: order.currency,
            amount: order.amount,
        })
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating Razorpay order');
  }
});

router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest("hex");
   
    console.log(razorpay_signature,"razorpaysig");
    console.log(expectedSign,"sign")
  if (razorpay_signature === expectedSign) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

export default router;
