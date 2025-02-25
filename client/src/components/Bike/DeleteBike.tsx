"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { deleteBikeById } from "@/src/api/bikeApi";

interface DeleteBikeConfirmProps {
  bikeId: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteBike: React.FC<DeleteBikeConfirmProps> = ({ bikeId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteBikeById(bikeId);
      onDelete();
      onClose();
    } catch (error) {
      console.error("Error deleting bike:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this bike?</h2>
      <div className="flex justify-end gap-4">
        <Button onClick={onClose} className="bg-gray-500 text-white">Cancel</Button>
        <Button onClick={handleDelete} className="bg-red-600 text-white">Delete</Button>
      </div>
    </div>
  );
};

export default DeleteBike;
