import React from "react";
import { serviceType } from "@/src/types/serviceType";

interface GlobalServiceCardProps {
  item: serviceType;
}

const GlobalServiceCard: React.FC<GlobalServiceCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg  p-6 text-center border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.name}</h3>
      <p className="text-gray-600 text-sm">{item.description}</p>
    </div>
  );
};

export default GlobalServiceCard;