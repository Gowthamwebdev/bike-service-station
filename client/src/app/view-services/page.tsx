"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GlobalServiceCard from "@/src/components/GlobalServiceCard";
import Loader from "@/src/components/Loader";
import { getServices } from "@/src/api/serviceApi";
import { serviceType } from "@/src/types/serviceType";
import { useGlobalContext } from "@/src/context/GlobalProviders";

const ViewServices: React.FC = () => {
  const { services, setServices } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        if (services.length === 0) {
          const data = await getServices();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [services, setServices]);

  const handleServiceClick = (id: string) => {
    router.push(`/view-services/${id}`);
  };

  return (
    <div className="min-h-[70vh] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Our Services</h1>

        {loading ? (
          <Loader />
        ) : services.length === 0 ? (
          <p className="text-center text-gray-600">No services available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((item: serviceType) => (
              <div
                key={item.id}
                onClick={() => handleServiceClick(item.id)}
                className="cursor-pointer"
              >
                <GlobalServiceCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewServices;
