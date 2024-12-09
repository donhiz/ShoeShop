const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// const authMiddleware = (roles = []) => {
//     return (req, res, next) => {
//         try {
//             const token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, 'secret_key');
//             req.user = decoded;
//
//             if (roles.length && !roles.includes(req.user.role)) {
//                 return res.status(403).json({ message: 'Access denied' });
//             }
//
//             next();
//         } catch (error) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//     };
// };

const authMiddleware = (req, res, next) => {
    try {
        // console.log(req.headers);


        // const accessLevel = req.headers.authorization.split(' ')[0];
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        // console.log(process.env.SECRET);
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);
        // req.user = decoded;

        if (decoded.accessLevel !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }


        next();
    } catch (error) {
        return res.status(401).json({ message: 'Error when authenticating.' });
    }
};

module.exports = authMiddleware;
