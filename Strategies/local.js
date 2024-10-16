//
// const mockUsers = require("../Users");
// const passport=require('passport');
// const LocalStratery = require('passport-local')
//
//
//
//
// passport.use(new LocalStratery((username, password, done) => {
//     const user = mockUsers.find(user => user.username === username);
//     if (!user || user.password !== password) {
//         return done(null, false, { message: 'Invalid username or password' });
//     }
//     return done(null, user);
// }));
//
// passport.serializeUser((user, done) => {
//     done(null, user.username);
// });
//
// passport.deserializeUser((username, done) => {
//     const user = mockUsers.find(user => user.username === username);
//     done(null, user);
// });
//
//
//
