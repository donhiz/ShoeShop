const express = require('express');
const router = express.Router();
const multer = require('multer');
const fse = require('fs-extra');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ' ' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB limit
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true);
        } else {
            return callback(new Error('Only images are allowed'));
        }
    }
});

// Routes for single upload
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));
});

router.post('/', upload.single('image'), (req, res) => {
    res.send('Upload Successful');
    console.log(req.file.filename);
    fse.move(`./images/${req.file.filename}`, `./public/img/${req.file.filename}`, (err) => {
        if (err) return console.error(err);
        console.log('File Moved Successfully!');
    });
});

// Routes for multiple uploads
router.get('/uploadMulti', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploadMulti.html'));
});

router.post('/uploadMulti', upload.array('images', 3), (req, res) => {
    res.send('Image Array Upload Successful');
    req.files.forEach(file => {
        fse.move(`./images/${file.filename}`, `./public/img/${file.filename}`, (err) => {
            if (err) return console.error(err);
            console.log('File Moved Successfully!');
        });
    });
});

module.exports = router;
