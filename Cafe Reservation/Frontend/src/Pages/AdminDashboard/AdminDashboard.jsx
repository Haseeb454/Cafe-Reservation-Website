import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "/Public/Background.jpg"; // ✅ Replace with your home bg image path

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Access Denied. Please login as admin.");
      navigate("/AdminLogin");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setBookings(data);
        setLoading(false);
      } else {
        alert("Unauthorized access");
        navigate("/AdminLogin");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      navigate("/AdminLogin");
    }
  };

  const deleteBooking = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reservations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });

      if (res.ok) {
        alert("Booking cancelled!");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert("Failed to cancel booking");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/reservations/${selectedBooking._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(selectedBooking),
      });

      if (res.ok) {
        alert("Booking updated successfully!");
        setShowModal(false);
        fetchBookings();
      } else {
        alert("Failed to update booking.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setSelectedBooking({ ...selectedBooking, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div
      className="min-h-screen text-white px-4 py-8 flex justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6 drop-shadow-lg">
          Admin Dashboard
        </h1>

        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          {loading ? (
            <p className="text-center">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-center">No reservations found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base rounded-xl overflow-hidden">
                <thead className="bg-yellow-500 text-black">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Guests</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-t border-yellow-400 hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-2">{booking.name}</td>
                      <td className="px-4 py-2">{booking.phone}</td>
                      <td className="px-4 py-2">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">{booking.time}</td>
                      <td className="px-4 py-2">{booking.guests}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowModal(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Animated Modal */}
        <AnimatePresence>
          {showModal && selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, y: -50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-gray-900 text-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              >
                <h2 className="text-xl font-bold mb-4 text-yellow-400 text-center">
                  Edit Booking
                </h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <input
                    name="name"
                    value={selectedBooking.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 rounded-xl bg-gray-800 text-white"
                  />
                  <input
                    name="phone"
                    value={selectedBooking.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-2 rounded-xl bg-gray-800 text-white"
                  />
                  <input
                    type="date"
                    name="date"
                    value={selectedBooking.date.slice(0, 10)}
                    onChange={handleChange}
                    className="w-full p-2 rounded-xl bg-gray-800 text-white"
                  />
                  <input
                    name="time"
                    value={selectedBooking.time}
                    onChange={handleChange}
                    placeholder="Time"
                    className="w-full p-2 rounded-xl bg-gray-800 text-white"
                  />
                  <input
                    type="number"
                    name="guests"
                    value={selectedBooking.guests}
                    onChange={handleChange}
                    placeholder="Guests"
                    className="w-full p-2 rounded-xl bg-gray-800 text-white"
                  />
                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-xl cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
