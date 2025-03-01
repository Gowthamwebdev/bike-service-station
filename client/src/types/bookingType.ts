export type bookingType = {
    id: string;
    userId: string;
    bikeId: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    bike: {
      id: string;
      name: string;
      brand: string;
      engineCapacity: string;
      registrationNumber: string;
    };
    services: string[];
    serviceNames: string[];
    status: "pending" | "confirmed" | "completed" | "cancelled";
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  