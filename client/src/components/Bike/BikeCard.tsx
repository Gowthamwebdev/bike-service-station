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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-[90%] max-w-sm p-4">
        <button className="absolute top-2 left-2" onClick={onClose}>
          <Image src={"/cancel.png"} alt="Close" width={24} height={24} />
        </button>

        <Image
          src={ "/placeholder-bike.png"}
          alt={bike.name}
          width={200}
          height={200}
          className="w-full rounded-md mb-4"
        />
        
        <h1 className="text-xl font-bold mb-2">{bike.name}</h1>
        <p className="text-gray-600">Brand: {bike.brand}</p>
        <p className="text-gray-600">Engine: {bike.engineCapacity}</p>
        <p className="text-gray-600 mb-4">Reg No: {bike.registrationNumber}</p>

        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white w-full py-2 rounded-md"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 text-white w-full py-2 rounded-md"
            onClick={() => setIsDeleting(true)}
          >
            Delete
          </button>
        </div>

        {isEditing && (
          <EditBikeForm
            bike={bike}
            onClose={() => setIsEditing(false)}
            onUpdate={onUpdate}
          />
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
