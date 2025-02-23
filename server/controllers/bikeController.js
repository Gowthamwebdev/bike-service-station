import { PrismaClient } from "@prisma/client";
import express from 'express';

const prisma = new PrismaClient();
const router = express.Router();

// Get all bikes
export const getBikes = async (req, res) => {
    try {
        const user = req.user._id;
        const bikes = await prisma.bike.findMany({ where: {userId: user}});
        res.status(200).json(bikes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single bike by ID
export const getBike = async (req, res) => {
    try {
        const { bikeId } = req.params;
        const bike = await prisma.bike.findUnique({
            where: { id: bikeId },
        });
        if (!bike) return res.status(404).json({ message: "Bike not found" });
        res.status(200).json(bike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new bike
export const addBike = async (req, res) => {
    try {
        const user = req.user._id;
        const { name, brand, engineCapacity, registrationNumber } = req.body;
        console.log(user)
        const existingBike = await prisma.bike.findFirst({
            where: { registrationNumber }
        });

        if (existingBike) {
            return res.status(400).json({ message: 'Bike with this registration number already exists' });
        }

        const newBike = await prisma.bike.create({
            data: { userId: user, name, brand, engineCapacity, registrationNumber },
        });       
        res.status(201).json(newBike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a bike
export const updateBike = async (req, res) => {
    try {
        const { bikeId } = req.params;
        const { name, brand, engineCapacity } = req.body;
        const updatedBike = await prisma.bike.update({
            where: { id: bikeId },
            data: { name, brand, engineCapacity },
        });
        res.status(200).json(updatedBike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a bike
export const deleteBike = async (req, res) => {
    try {
        const { bikeId } = req.params;
        await prisma.bike.delete({
            where: { id: bikeId },
        });
        res.status(200).json({ message: "Bike deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default router;
