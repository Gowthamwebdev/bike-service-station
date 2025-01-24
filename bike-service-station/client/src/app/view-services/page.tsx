'use client';

import { viewServices } from '@/src/api/getServices';
import React, { useEffect, useState } from 'react';

interface Service {
  serviceName: string;
}

function ViewServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await viewServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] flex justify-center items-center duration-200">
      <h2 className='font-bold'>What we provide</h2>
      {services.length > 0 ? (
        services.map((item) => (
          <div key={item.serviceName} className='p-4 bg-orange-300 m-4'>
            <h2>{item.serviceName}</h2>
          </div>
        ))
      ) : (
        <p>Loading services...</p>
      )}
    </div>
  );
}

export default ViewServices;
