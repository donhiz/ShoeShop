// const { body } = require('express-validator');
//
// const shippingValidation = [
//     body('first-name')
//         .notEmpty().withMessage('First name is required.')
//         .isAlpha().withMessage('First name must contain only letters.'),
//     body('last-name')
//         .notEmpty().withMessage('Last name is required.')
//         .isAlpha().withMessage('Last name must contain only letters.'),
//     body('address')
//         .notEmpty().withMessage('Address is required.')
//         .isLength({ min: 10 }).withMessage('Address must be at least 10 characters long.'),
//     body('city')
//         .notEmpty().withMessage('City is required.')
//         .isAlpha().withMessage('City must contain only letters.'),
//     body('zip')
//         .notEmpty().withMessage('Zip code is required.')
//         .matches(/^\d{5}(-\d{4})?$/).withMessage('Zip code must be a valid 5-digit code.')
//         .custom((value) => {
//             if (value.startsWith('0')) {
//                 throw new Error('Zip code cannot start with 0.');
//             }
//             return true;
//         }),
// ];
//
// module.exports = shippingValidation;
