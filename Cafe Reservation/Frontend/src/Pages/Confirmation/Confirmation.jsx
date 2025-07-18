import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ImSpinner2 } from "react-icons/im";

export default function Confirmation() {
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    // Spinner delay
    const timer = setTimeout(() => setLoading(false), 3000);

    // Get data from localStorage
    const storedData = localStorage.getItem("reservationData");
    if (storedData) {
      setReservation(JSON.parse(storedData));
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat text-white px-4 py-12"
      style={{ backgroundImage: "url('/Background.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6 w-full max-w-md"
      >
        {loading ? (
          <>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="flex justify-center"
            >
              <ImSpinner2 className="h-16 w-16 text-yellow-400 animate-spin" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-yellow-300 font-medium"
            >
              Processing your reservation...
            </motion.h2>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="flex justify-center"
            >
              <CheckCircleIcon className="h-24 w-24 text-yellow-400 drop-shadow-xl" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-yellow-600 text-transparent bg-clip-text"
            >
              Table Booked!
            </motion.h1>

            {reservation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-sm sm:text-base space-y-2"
              >
                <p>
                  <span className="text-yellow-300 font-semibold">Name:</span>{" "}
                  {reservation.name}
                </p>
                <p>
                  <span className="text-yellow-300 font-semibold">Phone:</span>{" "}
                  {reservation.phone}
                </p>
                <p>
                  <span className="text-yellow-300 font-semibold">Date:</span>{" "}
                  {new Date(reservation.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-yellow-300 font-semibold">Time:</span>{" "}
                  {reservation.time}
                </p>
                <p>
                  <span className="text-yellow-300 font-semibold">Guests:</span>{" "}
                  {reservation.guests}
                </p>
              </motion.div>
            )}

            <p className="text-sm sm:text-base text-gray-400 mt-2">
              Thank you for reserving with us. We look forward to serving you!
            </p>

            <NavLink
              to="/"
              className="inline-block mt-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-full transition-transform hover:scale-105 shadow-md"
            >
              Go Back Home
            </NavLink>
          </>
        )}
      </motion.div>
    </section>
  );
}
