const express = require('express');
const { validationResult } = require('express-validator');
const path = require('path');
const paymentValidation = require('./routes/payment');
const shippingValidation = require('./routes/shipping');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

// Serve the HTML files
app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});
app.get('/account.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'account.html'));
});
app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/products.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});
app.get('/products-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products-details.html'));
});

// Payment Form route
app.post('/submit-form', paymentValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Payment details received successfully' });
});

// Shipping Form route
app.post('/submit-shipping', shippingValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Shipping details received successfully' });
});

// File upload route
app.use('/api', uploadRoutes); // Mount the upload route under '/api'

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
