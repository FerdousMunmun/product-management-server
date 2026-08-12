import { Router } from "express";
import prisma from "../../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({

    select: {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
  },
    where: {
      isDeleted: false,
    },
  });

  res.json({
    success: true,
    data: users,
  });
});

router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    success: true,
    data: user,
  });
});


router.patch("/:id", async (req, res) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({
    success: true,
    data: updatedUser,
  });
});


router.delete("/:id", async (req, res) => {
  const deletedUser = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      isDeleted: true,
    },
  });

  res.json({
    success: true,
    data: deletedUser,
  });
});
export default router;