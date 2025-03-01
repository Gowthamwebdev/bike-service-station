"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getServiceById } from "@/src/api/serviceApi";
import { serviceType } from "@/src/types/serviceType";
import Loader from "@/src/components/Loader";

const ServiceDetails: React.FC = () => {
  const { id } = useParams();
  const [service, setService] = useState<serviceType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const data = await getServiceById(id as string);
        setService(data);
      } catch (error) {
        console.error("Failed to fetch service details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  if (loading) return <Loader />;
  if (!service) return <p className="text-center">Service not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="text-lg text-gray-700">{service.description}</p>
    </div>
  );
};

export default ServiceDetails;
