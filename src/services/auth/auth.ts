import { Router } from "express";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working",
  });
});


router.post("/register", async (req, res) => {
  const payload = req.body;

  const hashedPassword = await bcrypt.hash(
    payload.password,
    10
  );

 const user = await prisma.user.create({
  data: {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  },
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
  },
});
   res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: user,
  });
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  res.json({
    success: true,
    message: "Login Successful",
    token,
  });
});

export default router;