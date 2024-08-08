"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
    message: "Too many requests please try after 15 minutes",
    statusCode: 429,
});
app.use(express_1.default.json());
app.use(limiter);
const Users = [];
// Endpoint to reset password
app.post("/resetPassword", (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const otp = Math.floor(Math.random() * 9000).toString();
    const existingUser = Users.find((user) => user.email === email);
    if (existingUser) {
        existingUser.otp = otp;
        console.log(`The OTP for ${existingUser.email} is ${otp}`);
    }
    else {
        Users.push({ email, otp, password });
        console.log(`The OTP for ${email} is ${otp}`);
    }
    res.json({ message: "OTP generated, please check your email" });
});
// Endpoint to authenticate OTP and change password
app.post("/otpauth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, otp } = req.body;
    if (!email || !password || !otp) {
        return res
            .status(400)
            .json({ message: "Email, password, and OTP are required" });
    }
    const existingUser = Users.find((user) => user.email === email);
    if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.otp) === otp) {
        existingUser.password = password;
        console.log(`The password for ${existingUser.email} has changed to ${password}`);
        res.json({
            message: "Password has been changed successfully",
            success: true,
        });
    }
    else {
        res
            .status(404)
            .json({
            message: "The OTP seems invalid, please try again",
            success: false,
        });
    }
}));
// Start the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
