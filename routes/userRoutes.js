const express = require('express');
const router = express.Router();
const UserDetails = require('../models/userDetails');
const jwt = require('jsonwebtoken');
// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new UserDetails(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Login user
router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await UserDetails.findOne({ userName });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ _id: user._id }, 'ANGULAR', { expiresIn: '1h' });
        
        res.status(200).send({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/users', async (res, req) => {
    try {
        const user = new UserDetails(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)

    }
})


// Read all users
router.get('/users', async (req, res) => {
    try {
        const users = await UserDetails.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);

    }
});

// Read a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await UserDetails.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const user = await UserDetails.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await UserDetails.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;