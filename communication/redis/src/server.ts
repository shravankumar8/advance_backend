const express = require("express");
import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
const prisma = new PrismaClient();
const app = express();
const port = 3000;
const redisClient = createClient({ url: "redis://localhost:6379" });
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();
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

    res.json({ message: "user saved succesfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "internal server error" });
  }
});
app.get("/student", async (req: any, res: any) => {
  const id = req.body.id;
  try {
    const rid = `student:${id}`;
    const res1 = await redisClient.hGetAll(rid);
    console.log(res1);
    if (res1.name) {
      return res.json({ message: "user found", res1 });
    } else {
      const res2 = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      const user = {
        email: res2?.email!,
        name: res2?.name!,
        rollno: res2?.rollno!,
        classr: res2?.classr!,
      };

      const cacheUser = await redisClient.hSet(`student:${id}`, user);
      return res.json({ message: "user found", res2 });
    }

    res.json({
      messae: "user not found",
    });
  } catch (error) {
    console.log(error);
    res.json({
      messae: "user not found",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});