// // 📁 File: app.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const paymentRoutes = require('./routes/paymentRoutes');

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api/payment', paymentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(Server running on port ${PORT}));


// // 📁 File: routes/paymentRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//   createOrder,
//   verifyPayment,
//   handleWebhook
// } = require('../controllers/paymentController');

// router.post('/create-order', createOrder);
// router.post('/verify', verifyPayment);
// router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// module.exports = router;


// // 📁 File: controllers/paymentController.js
// const Razorpay = require('razorpay');
// const crypto = require('crypto');

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// exports.createOrder = async (req, res) => {
//   try {
//     const options = {
//       amount: req.body.amount * 100, // amount in smallest currency unit
//       currency: 'INR',
//       receipt: receipt_order_${Date.now()}
//     };
//     const order = await razorpay.orders.create(options);
//     res.status(200).json({ success: true, order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: 'Order creation failed' });
//   }
// };

// exports.verifyPayment = (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   const generatedSignature = crypto
//     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(razorpay_order_id + '|' + razorpay_payment_id)
//     .digest('hex');

//   if (generatedSignature === razorpay_signature) {
//     // Payment is legitimate
//     res.status(200).json({ success: true, message: 'Payment verified successfully' });
//   } else {
//     res.status(400).json({ success: false, message: 'Invalid signature, payment failed' });
//   }
// };

// exports.handleWebhook = (req, res) => {
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
//   const signature = req.headers['x-razorpay-signature'];
//   const digest = crypto
//     .createHmac('sha256', secret)
//     .update(req.body)
//     .digest('hex');

//   if (digest === signature) {
//     const event = JSON.parse(req.body);
//     console.log('Webhook event received:', event.event);
//     // Save event.payload to DB or take action as per event
//     res.status(200).json({ status: 'ok' });
//   } else {
//     res.status(400).json({ status: 'Invalid signature' });
//   }
// };


// // 📁 File: .env
// // RAZORPAY_KEY_ID=your_key_id
// // RAZORPAY_KEY_SECRET=your_key_secret
// // RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
// // PORT=5000