"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.auth, async (req, res) => {
    const products = await prisma_1.default.product.findMany({
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
    const product = await prisma_1.default.product.findFirst({
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
    const result = await prisma_1.default.product.create({
        data: req.body,
    });
    res.json({
        success: true,
        data: result,
    });
});
router.patch("/:id", async (req, res) => {
    const result = await prisma_1.default.product.update({
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
    const product = await prisma_1.default.product.update({
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
exports.default = router;
