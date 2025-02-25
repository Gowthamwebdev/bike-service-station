"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { updateBikeById } from "@/src/api/bikeApi";
import { bikeType } from "@/src/types/bikeType";
import toast from "react-hot-toast";

interface EditBikeFormProps {
  bike: bikeType;
  onClose: () => void;
  onUpdate: () => void;
}

const EditBike: React.FC<EditBikeFormProps> = ({ bike, onClose, onUpdate }) => {
  const [bikeData, setBikeData] = useState(bike);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBikeData({ ...bikeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await toast.promise(updateBikeById(bike.id, bikeData), {
        loading: "Loading...",
        success: "Bike updated successfully!",
        error: "Failed to update bike.",
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating bike:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Bike</h2>
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={bikeData.name}
            onChange={handleChange}
            fullWidth
          />
          <Input
            label="Brand"
            name="brand"
            value={bikeData.brand}
            onChange={handleChange}
            fullWidth
          />
          <Input
            label="Engine Capacity"
            name="engineCapacity"
            value={bikeData.engineCapacity}
            onChange={handleChange}
            fullWidth
          />
          <Input
            label="Registration Number"
            name="registrationNumber"
            value={bikeData.registrationNumber}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="flex justify-end mt-6 gap-4">
          <Button onClick={onClose} className="bg-gray-500 text-white">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-orange-700 text-white">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBike;