import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  sessionId: String,
  customerEmail: String,
  amount_total: Number,
  payment_status: String,
}, { timestamps: true })

export const Order = mongoose.model('Order', OrderSchema)
