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
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({ url: "redis://localhost:6379" });
redisClient.on("error", (err) => console.log("Redis Client Error", err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield redisClient.connect();
        while (1) {
            const response = yield redisClient.brPop("problems", 0);
            // run the process on dome docker container process it
            yield new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            // sent it to a pubsub since its a response
            console.log("processed info ", response);
        }
    });
}
main();
