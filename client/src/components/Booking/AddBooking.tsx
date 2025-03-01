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
      await toast.promise(
        addBooking(bookingData),
        {
          loading: "Submitting booking...",
          success: "Booking created successfully!",
          error: "Failed to create booking.",
        }
      );
      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg border border-gray-600 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Book a Service
        </h2>

        {/* Bike Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Your Bike
          </label>
          <select
            value={bikeId}
            onChange={(e) => setBikeId(e.target.value)}
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Services
          </label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {services.map((service) => (
              <label
                key={service.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={service.id}
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceChange(service.id, service.name)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{service.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Handover Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Handover Date
          </label>
          <input
            type="date"
            value={handoverDate}
            onChange={(e) => setHandoverDate(e.target.value)}
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-6 items-center">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
