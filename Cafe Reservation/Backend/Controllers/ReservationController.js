const Reservation = require('../Models/ReservationModel');

// ✅ Create new reservation
exports.createReservation = async (req, res) => {
  try {
    const { name, phone, date, time, guests } = req.body;

    if (!name || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const reservation = new Reservation({ name, phone, date, time, guests });
    await reservation.save();

    res.status(201).json(reservation);
  } catch (err) {
    console.error('Error saving reservation:', err);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};

// ✅ Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

// ✅ Update reservation (Admin)
exports.updateReservation = async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating reservation:', err);
    res.status(500).json({ error: 'Failed to update reservation' });
  }
};

// ✅ Delete reservation (Admin)
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reservation canceled successfully' });
  } catch (err) {
    console.error('Error deleting reservation:', err);
    res.status(500).json({ error: 'Failed to cancel reservation' });
  }
};
