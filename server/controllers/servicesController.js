import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add new service
export const addServices = async (req, res) => {
    try {
        const { serviceName, description } = req.body;

        if (!serviceName) {
            return res.status(400).json({ error: "Service name is required." });
        }

        const newService = await prisma.service.create({
            data: {
                serviceName,
                description,
            },
        });

        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all services
export const getServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        console.log(services.length);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
      const { serviceId } = req.params;
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });
      console.log(serviceId, service);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
  
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  