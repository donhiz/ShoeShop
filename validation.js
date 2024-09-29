const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');


const app = express();
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static (__dirname+'/public/img'));
app.use('/css', express.static (__dirname+'/public/css'));// Serve static files from the 'public' directory

// Serve the HTML file
app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html')); // Adjust the path as necessary
});
app.get('/account.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'account.html')); // Adjust the path as necessary
});
app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html')); // Adjust the path as necessary
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as necessary
});
app.get('/products.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html')); // Adjust the path as necessary
});
app.get('/products-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products-details.html')); // Adjust the path as necessary
});
// Payment Form route
app.post('/submit-form', [
    body('card-number')
        .notEmpty().withMessage('Card number is required.')
        .isCreditCard().withMessage('Invalid card number format.'),
    body('cvv')
        .notEmpty().withMessage('CVV is required.')
        .isLength({ min: 3, max: 4 }).withMessage('CVV must be 3 or 4 digits long.'),
    body('name-on-card')
        .notEmpty().withMessage('Name on card is required.')
        .isLength({ min: 2 }).withMessage('Name on card must be at least 2 characters long.'),
    body('expiry-date')
        .notEmpty().withMessage('Expiry date is required.')
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).withMessage('Expiry date must be in MM/YY format.')
        .custom((value) => {
            const [month, year] = value.split('/');
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                throw new Error('Expiry date must be in the future.');
            }
            return true;
        }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Payment details received successfully' });
});

// Shipping Form route
app.post('/submit-shipping', [
    body('first-name')
        .notEmpty().withMessage('First name is required.')
        .isAlpha().withMessage('First name must contain only letters.'),
    body('last-name')
        .notEmpty().withMessage('Last name is required.')
        .isAlpha().withMessage('Last name must contain only letters.'),
    body('address')
        .notEmpty().withMessage('Address is required.')
        .isLength({ min: 10 }).withMessage('Address must be at least 10 characters long.'),
    body('city')
        .notEmpty().withMessage('City is required.')
        .isAlpha().withMessage('City must contain only letters.'),
    body('zip')
        .notEmpty().withMessage('Zip code is required.')
        .matches(/^\d{5}(-\d{4})?$/).withMessage('Zip code must be a valid 5-digit code.')
        .custom((value) => {
            if (value.startsWith('0')) {
                throw new Error('Zip code cannot start with 0.');
            }
            return true;
        }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Shipping details received successfully' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
