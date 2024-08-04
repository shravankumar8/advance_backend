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
exports.checkRedisHealth = exports.getValue = exports.setValue = exports.k = void 0;
const redis_1 = require("redis");
// Create and configure Redis client
const redisClient = (0, redis_1.createClient)({ url: "redis://localhost:6379" });
redisClient.on("error", (err) => console.log("Redis Client Error", err));
// Connect to Redis
redisClient.connect();
exports.k = redisClient;
// Function to set a key-value pair in Redis
const setValue = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.set(key, value);
});
exports.setValue = setValue;
// Function to retrieve a value by key from Redis
const getValue = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield redisClient.get(key);
    console.log(resp);
    return null;
});
exports.getValue = getValue;
const checkRedisHealth = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.set("health", "ok");
        const reply = yield redisClient.get("health");
        return reply === "ok";
    }
    catch (error) {
        console.error("Redis Health Check Failed:", error);
        return false;
    }
});
exports.checkRedisHealth = checkRedisHealth;
(0, exports.setValue)("age1", "21302");
(0, exports.getValue)("key");
