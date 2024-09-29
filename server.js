const express = require('express');
const { validationResult } = require('express-validator');
const path = require('path');
const paymentValidation = require('./routes/payment');
const shippingValidation = require('./routes/shipping');

const server = express();
server.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
server.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

// Serve the HTML files
server.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});
server.get('/account.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'account.html'));
});
server.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});
server.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
server.get('/products.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});
server.get('/products-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products-details.html'));
});

// Payment Form route
server.post('/submit-form', paymentValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Payment details received successfully' });
});

// Shipping Form route
server.post('/submit-shipping', shippingValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Shipping details received successfully' });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
