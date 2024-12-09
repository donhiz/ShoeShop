const mongoose = require('mongoose');
const shoeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    brand: { type: String, required: true },
    size: { type: Number, required: true },
    rating: { type: String },
    price: { type: Number, required: true },
    releaseDate: { type: Date },
    quantityInStock: { type: Number, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    imgUrl: { type: String }
});

module.exports = mongoose.model('Shoe', shoeSchema);

