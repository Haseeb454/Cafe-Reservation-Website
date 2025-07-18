const express = require('express');
const router = express.Router();

const { signup, loginAdmin } = require('../Controllers/AdminController');
const {
  updateReservation,
  deleteReservation
} = require('../Controllers/ReservationController'); // ✅ Correct controller

const verifyToken = require('../Middlewares/verifyToken');

// Auth routes
router.post('/signup', signup);
router.post('/login', loginAdmin);

// Protected route for dashboard
router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to Admin Dashboard", adminId: req.userId });
});

// Admin booking controls
router.put('/:id', verifyToken, updateReservation);    // ✅ Protected edit
router.delete('/:id', verifyToken, deleteReservation); // ✅ Protected delete

module.exports = router;
