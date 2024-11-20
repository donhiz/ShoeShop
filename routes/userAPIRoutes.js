const express = require('express');
const Customer = require('../models/user'); // Adjust the path as necessary
const router = express.Router();

// Create a customer
router.post('/users', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all customers
router.get('/users', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single customer by ID
router.get('/users/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a customer
router.put('/users/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(updatedCustomer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a customer
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
