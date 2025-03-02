'use client';

import React, { useEffect } from 'react';
import { getBookings } from '@/src/api/bookingApi';
import { useGlobalContext } from '@/src/context/GlobalProviders';

const GetBookings: React.FC = () => {
  const { setBookings } = useGlobalContext();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [setBookings]);

  return null;
};

export default GetBookings;
