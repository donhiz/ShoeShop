const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');
const uploadRoutes = require('./routes/upload');
const passport = require('passport');
const session=require('express-session');
const {memoryStorage} = require("multer");
const LocalStrategy=require('passport-local').Strategy;
const mockUsers=require('./Users');
require('dotenv').config();
const connectDB = require('./config/db');
// require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

// middle setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//test routes
app.get('/api/user', (req, res) => {
    res.send('Server is working!');
});

// Import user routes
const userAPIRoutes = require('./routes/userAPIRoutes');
const productAPIRoutes = require('./routes/productAPIRoutes');
const orderAPIRoutes= require('./routes/orderAPIRoutes');
const loginAPIRoutes = require('./routes/loginAPIRoutes');

// Import the file
app.use('/api', userAPIRoutes); // Use the imported routes
app.use('/api', productAPIRoutes);
app.use('/api', orderAPIRoutes);
app.use('/api', loginAPIRoutes);


//setup middleware
app.use(session({
    secret: process.env.SECRET,          // Required: secret used to sign the session ID cookie
    resave: false,                // Don't save session if unmodified
    saveUninitialized: false,     // Don't create session until something is stored
    cookie: {
        maxAge: 60000             // Optional: set cookie expiration time (in milliseconds)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy (Authentication logic)
passport.use(new LocalStrategy((username, password, done) => {
    const user = mockUsers.find(user => user.username === username && user.password === password);
    if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
    }
    return done(null, user);
}));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user.username);
});

// Deserialize user from session
passport.deserializeUser((username, done) => {
    console.log(`username is: ${username}`);
    try{
        //Find the user and password from mockUsers, make sure they exist
        const findUser = mockUsers.find((user) => user.username === username)
        // If user object is not found throw exception to be caught in the catch section
        if (!findUser) {throw new Error ('User not found');}
        //if user exists and password is correct call the done function
        //the done() function which takes 2 parameters an error and a user value
        done(null, findUser)

    }
    catch(err){
//call done when catching the error too
        done(err, null)
    }
})
// Route for rendering login page
app.get('/account', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/index'); // If already logged in, redirect to products
    }
    res.sendFile(path.join(__dirname, 'public', 'account.html')); // Serve your login page
});
// Middleware to ensure authentication for all other routes
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/account'); // Redirect to login if not authenticated
}
app.get('/account', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/index'); // Redirect to index if already logged in
    }
    res.sendFile(path.join(__dirname, 'public', 'account.html')); // Serve login page
});
// Protecting
app.get('/index', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index page
});
app.get('/products', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html')); // Serve index page
});
app.get('/cart', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carts.html')); // Serve index page
});
app.get('/products-details', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products-details.html')); // Serve index page
});
app.get('/form', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html')); // Serve index page
});

// app.use(ensureAuthenticated);
app.post('/account', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/account',
    failureFlash: true,
}));

// Serve the HTML files
app.get('/form', (req, res) => {
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
// app.get('/account', (req, res) => res.sendFile(path.join(__dirname, 'public', 'account.html')));
// app.get('/cart', (req, res) => res.sendFile(path.join(__dirname, 'public', 'cart.html')));
// app.get('/index', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
// app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'public', 'products.html')));
// app.get('/products-details', (req, res) => res.sendFile(path.join(__dirname, 'public', 'products-details.html')));

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

// // Handle POST request for /submit-feedback
app.post('/submit-feedback', (req, res) => {
    const feedback = req.body.feedback;
    console.log('Feedback received:', feedback);
    res.send('Feedback received successfully!');
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