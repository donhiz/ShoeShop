const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../temp/uploads')); // Temporary directory for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name conflicts
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        // Accept only image files
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
    }
});

// Upload route
router.post('/upload', upload.single('file'), (req, res) => {
    const otherInputsAreValid = true; // Placeholder for other form input validations

    if (req.file && otherInputsAreValid) {
        const tempFilePath = path.join(__dirname, '../temp/uploads', req.file.filename);
        const permanentFilePath = path.join(__dirname, '../public/uploads', req.file.filename);

        // Move the file to a permanent location
        fs.rename(tempFilePath, permanentFilePath, (err) => {
            if (err) {
                // If moving fails, delete the temporary file
                fs.unlinkSync(tempFilePath);
                return res.status(500).json({ message: 'Error moving file to permanent location.' });
            }
            res.json({ message: 'File uploaded successfully', file: req.file });
        });
    } else {
        if (req.file) {
            // Delete the invalid file
            fs.unlinkSync(path.join(__dirname, '../temp/uploads', req.file.filename));
        }
        res.status(400).json({ message: 'Invalid file or missing form inputs.' });
    }
});

// Handle errors globally
router.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({ message: err.message });
    } else {
        next();
    }
});

module.exports = router;
