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
const app = (0, express_1.default)();
const Users = [];
app.use(express_1.default.json());
app.post("/resetPassword", (req, res) => {
    const email = req.body.email;
    const password = "";
    const otp = Math.floor(Math.random() * 900000).toString();
    const existingUser = Users.find((user) => user.email === email);
    if (existingUser) {
        existingUser.otp = otp;
        console.log(`the otp for ${existingUser === null || existingUser === void 0 ? void 0 : existingUser.email} is ${otp} `);
    }
    else {
        Users.push({ email, otp, password });
        console.log(`the otp for ${email} is ${otp} `);
    }
    res.status(404).json({ message: "Otp generated please check your email" });
});
app.post("/otpauth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, otp } = req.body;
    const existingUser = Users.find((user) => user.email === email);
    if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.otp) === otp) {
        console.log(`the password for ${existingUser === null || existingUser === void 0 ? void 0 : existingUser.email} has changed to ${password} `);
        existingUser.password = password;
        res.json({ message: "password has changed succesfully", success: true });
        return;
    }
    else {
        res
            .status(404)
            .json({
            message: "the otp seems invalid please try again",
            success: false,
        });
        return;
    }
}));
app.listen(3000, () => {
    console.log("server is listening on 3000");
});
