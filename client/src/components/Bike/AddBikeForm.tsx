"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { addBike } from "@/src/api/bikeApi";
import { toast } from "react-hot-toast";

const AddBikeForm = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
  const [bikeData, setBikeData] = useState({
    name: "",
    brand: "",
    engineCapacity: "",
    registrationNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBikeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(
        addBike(bikeData),
        {
          loading: "Adding bike...",
          success: "Bike added successfully!",
          error: "Failed to add bike. Please try again.",
        }
      );
      setBikeData({ name: "", brand: "", engineCapacity: "", registrationNumber: "" }); // Reset form
      setShowForm(false); // Close the form
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="absolute top-1/3 left-1/2 w-[40vw] backdrop-blur-lg transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          isRequired
          label="Bike Name"
          name="name"
          placeholder="Enter bike name"
          value={bikeData.name}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          label="Brand"
          name="brand"
          placeholder="Enter brand"
          value={bikeData.brand}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          label="Engine Capacity"
          name="engineCapacity"
          placeholder="Enter engine capacity"
          value={bikeData.engineCapacity}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          label="Registration Number"
          name="registrationNumber"
          placeholder="Enter registration number"
          value={bikeData.registrationNumber}
          onChange={handleInputChange}
        />
        <div className="flex gap-4">
          <Button type="submit" color="primary">
            Submit
          </Button>
          <Button variant="bordered" onClick={() => setShowForm(false)} color="danger">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBikeForm;