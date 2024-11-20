const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    cusID: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    billingAddress: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date }
});

module.exports = mongoose.model('user', customerSchema);
