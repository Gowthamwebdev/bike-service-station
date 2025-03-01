"use client";

import React from "react";
import AddBooking from "@/src/components/Booking/AddBooking";

const CreateBookingPage = () => {
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Create New Booking</h1>
      <AddBooking
        onClose={() => (window.location.href = "/bookings")}
      />
    </div>
  );
};

export default CreateBookingPage;