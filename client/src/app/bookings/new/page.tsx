"use client";

import React from "react";
import AddBooking from "@/src/components/Booking/AddBooking";

const CreateBookingPage = () => {
  return (
    <div className="p-4 sm:p-6 flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-2xl">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
          Create New Booking
        </h1>
        <AddBooking onClose={() => (window.location.href = "/bookings")} />
      </div>
    </div>
  );
};

export default CreateBookingPage;
