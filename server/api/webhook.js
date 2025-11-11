import Stripe from 'stripe';
// import mongoose from 'mongoose';
import Order from '../src/models/Order.js'; 
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ⚠️ Vercel serverless function cần tắt body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Hàm kết nối MongoDB nếu chưa kết nối
// async function connectDB() {
//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ MongoDB connected');
//   }
// }

// Handler webhook
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  await connectDB();

  // 🔥 Đọc raw body từ request
  let body = '';
  await new Promise((resolve) => {
    req.on('data', (chunk) => (body += chunk));
    req.on('end', resolve);
  });

  const sig = req.headers['stripe-signature'];
  let event;

  console.log('⚡ Webhook is calling...');

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Xử lý event thanh toán thành công
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      await Order.create({
        sessionId: session.id,
        customerEmail: session.customer_details.email,
        amount_total: session.amount_total,
        payment_status: session.payment_status,
      });

      console.log('✅ Order saved for session', session.id);
    } catch (err) {
      console.error('❌ Failed to save order:', err.message);
    }
  }

  res.status(200).send('ok');
}
