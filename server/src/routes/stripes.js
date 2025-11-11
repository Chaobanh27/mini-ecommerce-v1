// import express from 'express'
// import Stripe from 'stripe'
// import { Order } from '../models/Order.js'


// const router = express.Router()

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // 🟢 Tạo session thanh toán
// router.post('/create-checkout-session', async (req, res) => {
//   try {
//     const { products } = req.body
//     const line_items = products.map(p => ({
//       price_data: {
//         currency: 'usd',
//         product_data: { name: p.name },
//         unit_amount: p.price * 100,
//       },
//       quantity: p.quantity,
//     }))

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel`,
//     })

//     res.json({ id: session.id, url: session.url })
//   } catch (error) {
//     console.error('❌ Error creating session:', error.message)
//     res.status(500).json({ error: error.message })
//   }
// })

// // 🟣 Webhook Stripe
// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//   const sig = req.headers['stripe-signature']
//   let event

//   console.log('webhook is calling');
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
//   } catch (err) {
//     console.error('❌ Webhook signature error:', err.message)
//     return res.status(400).send(`Webhook Error: ${err.message}`)
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object

//     await Order.create({
//       sessionId: session.id,
//       customerEmail: session.customer_details.email,
//       amount_total: session.amount_total,
//       payment_status: session.payment_status,
//     })

//     console.log('✅ Order saved for session', session.id)
//   }

//   res.status(200).send()
// })

// export default router
