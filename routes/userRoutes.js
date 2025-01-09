const express = require('express');
const router = express.Router();
const UserDetails = require('../models/userDetails');

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


router.post('/users',async(res,req)=>{
    try {
       const user= new UserDetails(req.body)
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
router.patch('/users/:id', async (req, res) => {
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