const express = require("express");
import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
const prisma = new PrismaClient();
const app = express();
const port = 3000;
const redisClient = createClient({ url: "redis://localhost:6379" });
redisClient.on("error", (err) => console.log("Redis Client Error", err));
app.use(express.json());
app.post("/students", async (req: any, res: any) => {
  const name = req.body.name;

  const email = req.body.email;
  const rollno = req.body.rollno;
  const classr = req.body.classr;

  try {
    let newUser = await prisma.user.create({
      data: {
        email,
        name,
        rollno,
        classr,
      },
    });

    console.log(newUser);
    res.json({"message":"user saved succesfully"})
  } catch (error) {
    console.log(error)
    res.json({"message":"internal server error"})
  }
});
app.get("/student", async (req: any, res: any) => {
  try {
    await redisClient.connect();
    const id = req.body.id;
    const res1 = await redisClient.hGetAll(id);
    if (res1) {
    } else {
      const res1 = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      const cacheUser = await redisClient.hSet(id, {
        email: res1?.email!,
        name: res1?.name!,
        rollno: res1?.rollno!,
        classr: res1?.classr!,
      });
      return res.json({ message: "user found", res1 });
    }

    res.json({
      messae: "user not found",
    });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
