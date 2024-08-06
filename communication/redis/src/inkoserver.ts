
import { createClient } from "redis";

const redisClient = createClient({ url: "redis://localhost:6379" });
redisClient.on("error", (err) => console.log("Redis Client Error", err));
async function main() {
  await redisClient.connect();
  while (1) {
    const response = await redisClient.brPop("problems", 0,);
    // run the process on dome docker container process it
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    // sent it to a pubsub since its a response
    console.log("processed info ", response);
  }
}
main()