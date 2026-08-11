import { Router } from "express";
import prisma from "../../lib/prisma";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get("/",auth, async (req, res) => {
  const products = await prisma.product.findMany({
      where: {
      isDeleted: false,
    },
    include: {
      category: true,
      user: true,
    },
  });

  res.json({
    success: true,
    data: products,
  });
});




router.get("/:id", async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.params.id,
      isDeleted: false,
    },
    include: {
      category: true,
      user: true,
    },
  });

  res.json({
    success: true,
    data: product,
  });
});


router.post("/", async (req, res) => {
  const result = await prisma.product.create({
    data: req.body,
  });

  res.json({
    success: true,
    data: result,
  });
});



router.patch("/:id", async (req, res) => {
  const result = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({
    success: true,
    data: result,
  });
});



router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  res.json({
    success: true,
    data: product,
  });
});
export default router;