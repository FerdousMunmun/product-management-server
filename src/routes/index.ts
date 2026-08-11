import { Router } from "express";

import auth from "../services/auth/auth";
import users from "../services/users/users";
import categories from "../services/categories/categories";
import products from "../services/products/products";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running Successfully",
  });
});

router.use("/auth", auth);
router.use("/users", users);
router.use("/categories", categories);
router.use("/products", products);

export default router;