"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const categories = await prisma_1.default.category.findMany({
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
    const category = await prisma_1.default.category.findUnique({
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
    const category = await prisma_1.default.category.create({
        data: req.body,
    });
    res.json({
        success: true,
        data: category,
    });
});
router.patch("/:id", async (req, res) => {
    const category = await prisma_1.default.category.update({
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
    const category = await prisma_1.default.category.update({
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
exports.default = router;
