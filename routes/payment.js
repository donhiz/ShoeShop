const { body } = require('express-validator');

const paymentValidation = [
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
];

module.exports = paymentValidation;
