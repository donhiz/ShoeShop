const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderId: { type: Number, required: true, unique: true },
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }
});

module.exports = mongoose.model('Order', orderSchema);
