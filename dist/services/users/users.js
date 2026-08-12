"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const users = await prisma_1.default.user.findMany({
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
    const user = await prisma_1.default.user.findUnique({
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
    const updatedUser = await prisma_1.default.user.update({
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
    const deletedUser = await prisma_1.default.user.update({
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
exports.default = router;
