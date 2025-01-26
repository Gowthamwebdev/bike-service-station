import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async(req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        console.log(name, phone, email, password);
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
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
    try{
        //validating user input
        const { email, password } = req.body;
        console.log(email)
        if(!email ||!password){
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const user = await prisma.user.findUnique({ where: {email}});
        if(!user){
            return res.status(401).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const accessToken = jwt.sign({
            userId: user.id
        },
        process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        
        res.cookie('token', accessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Set to true in production
            sameSite: 'strict'
        })

        res.status(200).json({
            message: `Welcome ${user.name}`,
            accessToken,
            user: { name: user.name, email: user.email },
        });
    }  
        
    catch (error){
        res.status(500).json({ error: error.message });
    }
}