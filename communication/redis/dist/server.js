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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const client_1 = require("@prisma/client");
const redis_1 = require("redis");
const prisma = new client_1.PrismaClient();
const app = express();
const port = 3000;
const redisClient = (0, redis_1.createClient)({ url: "redis://localhost:6379" });
redisClient.on("error", (err) => console.log("Redis Client Error", err));
app.use(express.json());
app.post("/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const rollno = req.body.rollno;
    const classr = req.body.classr;
    try {
        let newUser = yield prisma.user.create({
            data: {
                email,
                name,
                rollno,
                classr,
            },
        });
        console.log(newUser);
        res.json({ "message": "user saved succesfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ "message": "internal server error" });
    }
}));
app.get("/student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
        const id = req.body.id;
        const res1 = yield redisClient.hGetAll(id);
        if (res1) {
        }
        else {
            const res1 = yield prisma.user.findFirst({
                where: {
                    id,
                },
            });
            const cacheUser = yield redisClient.hSet(id, {
                email: res1 === null || res1 === void 0 ? void 0 : res1.email,
                name: res1 === null || res1 === void 0 ? void 0 : res1.name,
                rollno: res1 === null || res1 === void 0 ? void 0 : res1.rollno,
                classr: res1 === null || res1 === void 0 ? void 0 : res1.classr,
            });
            return res.json({ message: "user found", res1 });
        }
        res.json({
            messae: "user not found",
        });
    }
    catch (error) { }
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
