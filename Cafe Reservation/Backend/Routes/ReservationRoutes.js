const express = require('express');
const router = express.Router();

const {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} = require('../Controllers/ReservationController');

const verifyToken = require('../Middlewares/verifyToken');

// Routes
router.post('/', createReservation); // user can reserve table
router.get('/', verifyToken, getReservations); // admin only
router.put('/:id', verifyToken, updateReservation); // admin only
router.delete('/:id', verifyToken, deleteReservation); // admin only

module.exports = router;
