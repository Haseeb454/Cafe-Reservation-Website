import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import logo from "/Logo.png";

export default function Reserve() {
  const [date, setDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      name,
      phone,
      date,
      time,
      guests,
    };

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        localStorage.setItem("reservationData", JSON.stringify(reservationData));
        navigate("/confirmation");
      } else {
        console.error("Booking failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12 sm:py-16 text-white"
      style={{ backgroundImage: "url('/Background.jpg')" }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl bg-black/60 backdrop-blur-xl border border-yellow-400/20 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-5"
      >
        <div className="flex justify-center">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-20 sm:h-24 drop-shadow-xl rounded-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
          />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          Reserve a Table
        </h2>

        {/* Input Group */}
        {[{
          label: "Full Name",
          type: "text",
          value: name,
          onChange: setName,
          placeholder: "Enter your name"
        }, {
          label: "Phone Number",
          type: "tel",
          value: phone,
          onChange: setPhone,
          placeholder: "03XX-XXXXXXX",
          pattern: "[0-9]{11}"
        }].map(({ label, type, value, onChange, placeholder, pattern }, idx) => (
          <div key={idx}>
            <label className="text-sm text-yellow-300 font-semibold mb-1 block">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required
              placeholder={placeholder}
              pattern={pattern}
              className="w-full px-5 py-3 rounded-3xl bg-black text-white ring-1 ring-yellow-400 outline-none shadow"
            />
          </div>
        ))}

        {/* Date Picker */}
        <div>
          <label className="text-sm text-yellow-300 font-semibold mb-1 block">Select Date</label>
          <div className="relative flex items-center">
            <CalendarIcon className="absolute left-3 h-5 w-5 text-yellow-400" />
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="pl-10 w-full px-5 py-3 rounded-3xl bg-black text-white ring-1 ring-yellow-400 outline-none shadow"
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>

        {/* Time Picker */}
        <div>
          <label className="text-sm text-yellow-300 font-semibold mb-1 block">Select Time</label>
          <div className="relative flex items-center">
            <ClockIcon className="absolute left-3 h-5 w-5 text-yellow-400" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="pl-10 w-full px-5 py-3 rounded-3xl bg-black text-white ring-1 ring-yellow-400 outline-none shadow"
            />
          </div>
        </div>

        {/* Guest Count */}
        <div>
          <label className="text-sm text-yellow-300 font-semibold mb-1 block">Number of Guests</label>
          <div className="relative flex items-center">
            <UsersIcon className="absolute left-3 h-5 w-5 text-yellow-400" />
            <input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
              className="pl-10 w-full px-5 py-3 rounded-3xl bg-black text-white ring-1 ring-yellow-400 outline-none shadow "
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="block w-full text-center py-3 mt-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold rounded-full shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          Confirm Reservation
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-block mt-4 text-yellow-300 hover:text-yellow-200 border border-yellow-400 px-4 py-2 rounded-full transition duration-300 hover:bg-yellow-500/10 shadow-sm"
          >
            ← Go Back Home
          </button>
        </div>
      </motion.form>
    </section>
  );
}
