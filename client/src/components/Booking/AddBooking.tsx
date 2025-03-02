"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/src/context/GlobalProviders";
import { addBooking } from "@/src/api/bookingApi";
import toast from "react-hot-toast";

interface AddBookingProps {
  onClose: () => void;
}

const AddBooking: React.FC<AddBookingProps> = ({ onClose }) => {
  const { bikes, services, user } = useGlobalContext();
  const [bikeId, setBikeId] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceNames, setServiceNames] = useState<string[]>([]);
  const [handoverDate, setHandoverDate] = useState<string>("");

  const handleServiceChange = (serviceId: string, serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );

    setServiceNames((prev) =>
      prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bikeId || selectedServices.length === 0 || !handoverDate) {
      toast.error("All fields are required.");
      return;
    }

    const bookingData = {
      userId: user?.userId,
      bikeId,
      services: selectedServices,
      serviceNames,
      date: new Date(handoverDate).toISOString(),
      status: "pending",
    };

    try {
      await toast.promise(addBooking(bookingData), {
        loading: "Submitting booking...",
        success: "Booking created successfully!",
        error: "Failed to create booking.",
      });
      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-white rounded-lg border border-gray-600"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
          Book a Service
        </h2>

        {/* Bike Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Your Bike</label>
          <select
            value={bikeId}
            onChange={(e) => setBikeId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
            required
          >
            <option value="" disabled>
              Choose a bike
            </option>
            {bikes.map((bike) => (
              <option key={bike.id} value={bike.id}>
                {bike.name}
              </option>
            ))}
          </select>
        </div>

        {/* Services Checkboxes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Services</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {services.map((service) => (
              <label key={service.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={service.id}
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceChange(service.id, service.name)}
                  className="h-4 w-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm">{service.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Handover Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Handover Date</label>
          <input
            type="date"
            value={handoverDate}
            onChange={(e) => setHandoverDate(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gradient-to-bl hover:from-gray-700 hover:to-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 p-3 bg-primary text-white rounded-lg hover:bg-gradient-to-bl hover:from-primary hover:to-red-700"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
