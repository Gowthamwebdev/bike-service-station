import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const signup = async(req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                name,
                phone: phone.toString(),
                email,
                password: hashedPassword,
            }
        });
        
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
};



export const login = async(req, res) => {

}