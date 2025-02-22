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



export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Generate token
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      // console.log(accessToken);
      // Set cookie
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
  
      // Return response
      res.status(200).json({
        message: `Welcome, ${user.name}`,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    } finally {
      await prisma.$disconnect();
    }
  };

  export const status = async(req, res) => {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ loggedIn: false });
      }
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ loggedIn: true, user: decoded });
      } catch (error) {
        return res.json({ loggedIn: false });
      }
  }

  export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  };