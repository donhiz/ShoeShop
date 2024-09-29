const express = require('express');
const bodyParser = require('body-parser');
const formValidationRouter = require('./validation'); // Make sure this path is correct

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route
app.use('/form', formValidationRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
