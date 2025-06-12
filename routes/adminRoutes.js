const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Example admin controller with dummy functions
const adminController = {
  manageUsers: (req, res) => {
    // Your admin logic here, e.g., list users, delete users, etc.
    res.json({ message: 'Admin managing users access granted' });
  },
  dashboardStats: (req, res) => {
    res.json({ message: 'Admin dashboard stats data' });
  }
};

// Protect this route so only logged-in admins can access
router.get('/manage-users', verifyToken, verifyAdmin, adminController.manageUsers);

// Another admin-only route example
router.get('/dashboard-stats', verifyToken, verifyAdmin, adminController.dashboardStats);

module.exports = router;
