import { Router } from "express";
import prisma from "../../lib/prisma";

const router = Router();


router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany({
    where: {
         
      isDeleted: false,
    },
  });

  res.json({
    success: true,
    data: categories,
  });
});

router.get("/:id", async (req, res) => {
  const category = await prisma.category.findUnique({
    where: {
      id: req.params.id,
      isDeleted: false,
    },
  });

  res.json({
    success: true,
    data: category,
  });
});


router.post("/", async (req, res) => {
  const category = await prisma.category.create({
    data: req.body,
  });

  res.json({
    success: true,
    data: category,
  });
});


router.patch("/:id", async (req, res) => {
  const category = await prisma.category.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({
    success: true,
    data: category,
  });
});


router.delete("/:id", async (req, res) => {
  const category = await prisma.category.update({
    where: {
      id: req.params.id,
    },
    data: {
      isDeleted: true,
    },
  });

  res.json({
    success: true,
    data: category,
  });
});

export default router;