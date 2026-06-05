const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                bio: user.bio,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile (without image)
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { bio, firstName, lastName, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                bio: bio || '',
                firstName: firstName || '',
                lastName: lastName || '',
                phone: phone || '',
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                bio: user.bio,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update profile image
router.put('/profile-image', authenticateToken, upload.single('profileImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete old profile image if it exists
        if (user.profileImage) {
            const oldImagePath = path.join(__dirname, '..', user.profileImage);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error('Error deleting old image:', err);
            });
        }

        // Update user with new image
        user.profileImage = `/uploads/${req.file.filename}`;
        await user.save();

        res.json({
            message: 'Profile image updated successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        console.error('Update profile image error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete profile image
router.delete('/profile-image', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.profileImage) {
            const imagePath = path.join(__dirname, '..', user.profileImage);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image:', err);
            });

            user.profileImage = null;
            await user.save();
        }

        res.json({
            message: 'Profile image deleted successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        console.error('Delete profile image error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
