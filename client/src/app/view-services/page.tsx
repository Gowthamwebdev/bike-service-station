'use client';

import { viewServices } from '@/src/api/getServices';
import { view } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Service {
  serviceName: string;
}

function ViewServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await viewServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] flex flex-col items-center p-6 duration-200">
      <h2 className="font-bold text-2xl mb-4">What We Provide</h2>
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {services.map((item) => (
            <div
              key={item.serviceName}
              className="border border-gray-400 rounded-md p-4 text-center"
            >
              <h3 className="text-lg font-medium">{item.serviceName}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading services...</p>
      )}
    </div>
  );
}

export default ViewServices;