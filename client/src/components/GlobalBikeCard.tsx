import React from "react";
import { bikeType } from "../types/bikeType";

interface GlobalBikeCardProps {
  bike: bikeType;
}

const GlobalBikeCard: React.FC<GlobalBikeCardProps> = ({ bike }) => {
  return (
    <div className="border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-300 bg-white">
      <div className="p-4 flex justify-between items-center gap-4">
        <div>
          <h1 className="capitalize font-semibold text-lg text-gray-800 truncate">
            {bike.name}
          </h1>
          <p className="text-gray-500 text-sm">{bike.brand}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-md font-medium">
            {bike.engineCapacity}
          </p>
          <p className="text-gray-600 text-sm">{bike.registrationNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalBikeCard;