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
        className="border border-gray-200 rounded-xl bg-white cursor-pointer hover:shadow-md transition-shadow duration-300"
        onClick={() => setSelectedBike(bike)}
      >
        <div className="px-2 pt-2">
          <Image 
            src={bike?.image || "/placeholder-bike.png"} 
            alt={bike.name} 
            width={100}
            height={100}
            className="aspect-square object-cover rounded-xl w-full"
          />
        </div>
        <div className="p-2 px-4">
          <h1 className="capitalize font-semibold truncate max-w-full">{bike.name}</h1>
          <p className="text-gray-400 text-sm">Brand: {bike.brand}</p>
          <p className="text-gray-400 text-sm">Engine: {bike.engineCapacity}</p>
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
