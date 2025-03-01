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
    <div className="min-h-[70vh] bg-gray-50 p-6">
      <div className="lg:px-20 px-8">
        <div className="flex justify-between items-center pt-5">
          <h1 className="text-lg font-semibold">Our Services</h1>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5 md:gap-10 gap-5">
          {services.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No services found.
            </p>
          ) : (
            services.map((item: serviceType) => (
              <div
                key={item.id}
                onClick={() => handleServiceClick(item.id)}
                className="cursor-pointer"
              >
                <GlobalServiceCard item={item} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ViewServices;