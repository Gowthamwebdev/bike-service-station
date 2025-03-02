"use client";

import React, { useState } from "react";
import { bikeType } from "@/src/types/bikeType";
import BikeCard from "./BikeCard";
import Image from "next/image";

interface GlobalBikeCardProps {
  bike: bikeType;
}

const GlobalBikeCard: React.FC<GlobalBikeCardProps> = ({ bike }) => {
  const [selectedBike, setSelectedBike] = useState<bikeType | null>(null);

  return (
    <>
      <div
        className="border border-gray-300 rounded-md bg-white p-2 cursor-pointer"
        onClick={() => setSelectedBike(bike)}
      >
        <Image
          src={bike?.image || "/placeholder-bike.png"}
          alt={bike.name}
          width={150}
          height={150}
          className="w-full h-auto rounded-md"
        />
        <div className="mt-2">
          <h1 className="text-lg font-semibold truncate">{bike.name}</h1>
          <p className="text-gray-500 text-sm">Brand: {bike.brand}</p>
          <p className="text-gray-500 text-sm">Engine: {bike.engineCapacity}</p>
        </div>
      </div>

      {selectedBike && (
        <BikeCard
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
          onUpdate={() => setSelectedBike(null)}
        />
      )}
    </>
  );
};

export default GlobalBikeCard;
