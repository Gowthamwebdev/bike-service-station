"use client";

import { getServices } from "@/src/api/serviceApi";
import { serviceType } from "@/src/types/serviceType";
import React, { useEffect, useState } from "react";
import GlobalServiceCard from "@/src/components/GlobalServiceCard";
import Loader from "@/src/components/Loader"; // Assuming you have a Loader component

function ViewServices() {
  const [services, setServices] = useState<serviceType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="lg:px-20 px-8">
        <div className="flex justify-between items-center pt-5">
          <h1 className="text-lg font-semibold">Our Services</h1>
        </div>
      </div>

      {/* Service List Section */}
      {loading ? (
        <Loader /> // Show loader while fetching services
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5 md:gap-10 gap-5">
          {services.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No services found.
            </p>
          ) : (
            services.map((item) => (
              <div key={item._id} className="">
                <GlobalServiceCard item={item} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ViewServices;