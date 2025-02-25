"use client";

import React, { useState } from "react";
import { bikeType } from "@/src/types/bikeType";
import EditBikeForm from "./EditBike";
import DeleteBikeConfirm from "./DeleteBike";
import Image from "next/image";

interface BikeCardProps {
  bike: bikeType;
  onClose: () => void;
  onUpdate: () => void;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50">
      <div className="border relative border-gray-200 rounded-xl bg-white w-[90%] max-w-md shadow-lg p-4">
        {/* Close Button */}
        <div className="absolute p-2 top-0 left-0">
          <Image
            src={'/cancel.png'}
            alt="cancel"
            width={30}
            height={30}
            onClick={onClose}
          />
        </div>

        {/* Bike Image */}
        <div className="rounded-xl overflow-hidden mb-4">
          <Image
            src={bike.image || "/placeholder-bike.png"}
            alt={bike.name}
            width={200}
            height={200}
            className="aspect-square object-cover w-full"
          />
        </div>

        {/* Bike Details */}
        <h1 className="capitalize font-bold text-2xl mb-2">{bike.name}</h1>
        <p className="text-gray-500 mb-1">Brand: {bike.brand}</p>
        <p className="text-gray-500 mb-1">Engine: {bike.engineCapacity}</p>
        <p className="text-gray-500 mb-4">Reg No: {bike.registrationNumber}</p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-green-900 to-gray-800 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleting(true)}
            className="bg-gradient-to-r from-orange-600 to-red-800 text-white py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Delete
          </button>
        </div>

        {/* Modals for Edit and Delete */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50">
            <EditBikeForm
              bike={bike}
              onClose={() => setIsEditing(false)}
              onUpdate={onUpdate}
            />
          </div>
        )}

        {isDeleting && (
          <DeleteBikeConfirm
            bikeId={bike.id}
            onClose={() => setIsDeleting(false)}
            onDelete={onUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default BikeCard;