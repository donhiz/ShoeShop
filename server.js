const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');
const paymentValidation = require('./routes/payment');
const shippingValidation = require('./routes/shipping');
const uploadRoutes = require('./routes/upload');
// Use node-fetch for making API requests in Node.js

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

// Serve the HTML files
app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});
// POST route for payment form validation
app.post('/submit-payment', [
    body('card-number').isCreditCard().withMessage('Please enter a valid card number.'),
    body('cvv').isLength({ min: 3, max: 4 }).withMessage('CVV must be 3 or 4 digits.'),
    body('name-on-card').notEmpty().withMessage('Name on card is required.'),
    body('expiry-date').matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).withMessage('Please enter a valid expiry date (MM/YY).'),
    body('card-number').custom(value => {
        if (value.length !== 16) {
            throw new Error('Card number must be 16 digits.');
        }
        return true;
    })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('Payment processed');
});

// POST route for shipping form validation
app.post('/submit-shipping', [
    body('first-name').notEmpty().withMessage('First name is required.'),
    body('last-name').notEmpty().withMessage('Last name is required.'),
    body('address').notEmpty().withMessage('Address is required.'),
    body('city').notEmpty().withMessage('City is required.'),
    body('zip').isPostalCode('US').withMessage('Please enter a valid US zip code.'),
    body('zip').custom(value => {
        if (!/^\d{5}$/.test(value)) {
            throw new Error('Zip code must be exactly 5 digits.');
        }
        return true;
    })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('Shipping details saved');
});
app.get('/account.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'account.html')));
app.get('/cart.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'cart.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/products.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'products.html')));
app.get('/products-details.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'products-details.html')));

// New route to handle the API call
// Updated API route to get IP info and render it on the page
app.get('/get-ip-info', async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const apiUrl = "https://ipgeolocation.abstractapi.com/v1/?api_key=a2b182b2cd84480e825d583f772bbef0&ip_address=24.72.109.103";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const simplifiedData = [{
            ip: data.ip_address,
            city: data.city,
            country: data.country,
            latitude: data.latitude,
            longitude: data.longitude
        }];

        // Render a Pug template and pass the simplified data
        res.render('ipinfo', { data: simplifiedData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
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
app.get('/wishlist.html', (req,res) =>{
    const wishlist = [
        { name: 'Red Printed T-Shirt', price: 50.00, image: 'images/buy-1.jpg' },
        { name: 'Blue Printed T-Shirt', price: 60.00, image: 'images/buy-2.jpg' }
    ];
    res.render('wishlist',(wishlist));
});


// Route to render the cart and wishlist page
app.get('/cart', (req, res) => {
    res.render('cart', { products, wishlist });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});