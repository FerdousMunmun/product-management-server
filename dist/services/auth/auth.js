"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Auth Route Working",
    });
});
router.post("/register", async (req, res) => {
    const payload = req.body;
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    const user = await prisma_1.default.user.create({
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
    const user = await prisma_1.default.user.findUnique({
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
    const isPasswordMatched = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: "Invalid Password",
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        role: user.role,
    }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.json({
        success: true,
        message: "Login Successful",
        token,
    });
});
exports.default = router;
