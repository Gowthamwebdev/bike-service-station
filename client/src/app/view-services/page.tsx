"use client";

import { getServices } from "@/src/api/serviceApi";
import { serviceType } from "@/src/types/serviceType";
import React, { useEffect, useState } from "react";
import GlobalServiceCard from "@/src/components/GlobalServiceCard";
import Loader from "@/src/components/Loader";

function ViewServices() {
  const [services, setServices] = useState<serviceType[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] flex flex-col items-center p-6 duration-200 bg-gray-50">
      <h2 className="font-bold text-3xl mb-8 text-gray-800">What We Provide</h2>
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {services.map((item) => (
            <GlobalServiceCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
}

export default ViewServices;