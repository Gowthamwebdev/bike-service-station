import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        bike: true,
      },
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId, bikeId, services, status, date } = req.body;

    if (!userId || !bikeId || !services || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const serviceDetails = await prisma.service.findMany({
      where: {
        id: { in: services },
      },
      select: { id: true, name: true },
    });

    const serviceIds = serviceDetails.map((service) => service.id);
    const serviceNames = serviceDetails.map((service) => service.name);

    const newBooking = await prisma.booking.create({
      data: {
        userId,
        bikeId,
        services: serviceIds,
        serviceNames,
        status: status || 'pending',
        date: new Date(date),
      },
    });
    

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const cancelPendingBooking = async (req, res) => {
  try {
    const bookingId = req.params.id; // Correct way to get bookingId
    console.log('Received bookingId:', req.params.id);

    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Failed to cancel booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};
