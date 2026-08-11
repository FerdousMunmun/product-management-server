import { Router } from "express";
import prisma from "../../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json({
    success: true,
    data: users,
  });
});

export default router;