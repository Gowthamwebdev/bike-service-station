'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { useGlobalContext } from '@/src/context/GlobalProviders';
import GetBookings from '@/src/components/Booking/GetBookings';
import { bookingType } from '@/src/types/bookingType';
import Loader from '@/src/components/Loader';
import Image from 'next/image';
import { cancelPendingBooking } from '@/src/api/bookingApi';

const Bookings: React.FC = () => {
  const { bookings } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (bookings) setLoading(false);
  }, [bookings]);

  const handleAddBooking = () => {
    router.push('bookings/new');
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      await cancelPendingBooking(bookingId);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gray-50 p-6">
      <div className="lg:px-20 px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <Button
            onClick={handleAddBooking}
            className="bg-gradient-to-tr from-gray-600 to-gray-800 text-white px-5 py-3 rounded-lg hover:opacity-90"
          >
            Book Now
          </Button>
        </div>

        <GetBookings />

        {loading ? (
          <Loader />
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            No bookings found.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking: bookingType) => (
              <div
                key={booking.id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm gap-6 flex md:flex-row flex-col md:items-center md:justify-between"
              >
                <div className="flex md:flex-row flex-col items-center md:gap-6 gap-2">
                  {/* Bike Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <Image
                      src={'/placeholder-bike.png'}
                      alt="Bike"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Bike Details */}
                  <div className="text-center md:text-left">
                    <p className="text-lg font-semibold">{booking.bike.name}</p>
                    <p className="text-gray-600">{booking.bike.brand}</p>
                    <p className="text-sm">
                      {Array.isArray(booking.serviceNames)
                        ? booking.serviceNames.join(', ')
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Status + Date + Cancel Button */}
                <div className="flex md:flex-row flex-col md:items-center gap-4 md:gap-6">
                  {/* Booking Status */}
                  <p className="text-sm font-medium text-center md:text-left">
                    <span
                      className={`px-3 py-1 text-white text-sm rounded-full ${
                        booking.status === 'pending'
                          ? 'bg-yellow-500'
                          : booking.status === 'confirmed'
                          ? 'bg-blue-500'
                          : booking.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>

                  {/* Booking Date */}
                  <p className="text-sm text-gray-500 text-center md:text-left">
                    {new Date(booking.date).toLocaleString()}
                  </p>

                  {/* Cancel Button */}
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="bg-red-500 text-white text-sm rounded-lg px-4 py-2 hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
