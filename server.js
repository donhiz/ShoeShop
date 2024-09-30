const express = require('express');
const { validationResult } = require('express-validator');
const path = require('path');
const paymentValidation = require('./routes/payment');
const shippingValidation = require('./routes/shipping');
const uploadRoutes = require('./routes/upload');
// Use node-fetch for making API requests in Node.js

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

// Serve the HTML files
app.get('/form.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'form.html')));
app.get('/account.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'account.html')));
app.get('/cart.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'cart.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/products.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'products.html')));
app.get('/products-details.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'products-details.html')));

// New route to handle the API call
app.get('/get-ip-info', async(req, res) => {
    const fetch = await import('node-fetch');
    const apiUrl = "https://ipgeolocation.abstractapi.com/v1/?api_key=a2b182b2cd84480e825d583f772bbef0&ip_address=24.72.109.103";

    fetch.default(apiUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Map the needed properties from the response
            const simplifiedData = {
                ip: data.ip_address,
                city: data.city,
                country: data.country,
                latitude: data.latitude,
                longitude: data.longitude
            };
            res.json(simplifiedData); // Send the simplified data to the client
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
        });
});

// Payment form route
app.post('/submit-form', paymentValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Payment details received successfully' });
});
// Handle POST request for /submit-feedback
app.post('/submit-feedback', (req, res) => {
    const feedback = req.body.feedback;
    console.log('Feedback received:', feedback);
    res.send('Feedback received successfully!');
});

// Shipping form route
app.post('/submit-shipping', shippingValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Shipping details received successfully' });
});

// File upload route
app.use('/api', uploadRoutes); // Mount the upload route under '/api'


// Set Pug as the templating engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Sample product and wishlist data
const products = [
    { name: 'Red Printed T-Shirt', price: 50.00, image: 'images/buy-1.jpg' },
    { name: 'Blue Printed T-Shirt', price: 60.00, image: 'images/buy-2.jpg' },
    { name: 'Green Printed T-Shirt', price: 55.00, image: 'images/buy-3.jpg' }
];

const wishlist = [
    { name: 'Red Printed T-Shirt', price: 50.00, image: 'images/buy-1.jpg' },
    { name: 'Blue Printed T-Shirt', price: 60.00, image: 'images/buy-2.jpg' }
];

// Route to render the cart and wishlist page
app.get('/cart', (req, res) => {
    res.render('cart', { products, wishlist });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});