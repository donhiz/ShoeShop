// const mongoose = require('mongoose');
// const User = require('../models/user'); // Adjust the path to your user model
// console.log('MONGO_URI:', process.env.MONGO_URI);
//
// mongoose.connect(process.env.MONGO_URI, {
// });
//
// const seedUsers = async () => {
//     try {
//         await User.deleteMany(); // Clear existing users
//
//         // Add sample users
//         await User.create([
//             { username: 'nhi', password: '123456', token: 'sampleTokenRead', accessLevel: 'read' },
//             { username: 'phuc', password: '123456', token: 'sampleTokenWrite', accessLevel: 'write' },
//             { username: 'long', password: '123456', token: 'sampleTokenAdmin', accessLevel: 'admin' },
//         ]);
//
//         console.log('Sample users added successfully.');
//         mongoose.connection.close();
//     } catch (error) {
//         console.error('Error seeding users:', error);
//         mongoose.connection.close();
//     }
// };
//
// seedUsers();
