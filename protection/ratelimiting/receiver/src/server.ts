import express from "express";

const app = express();
app.use(express.json());

interface UserCredentials {
  email: string;
  otp: string;
  password: string;
}

const Users: UserCredentials[] = [];

// Endpoint to reset password
app.post("/resetPassword", (req, res) => {
  const { email,password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(Math.random() * 9000).toString();
  const existingUser = Users.find((user) => user.email === email);

  if (existingUser) {
    existingUser.otp = otp;
    console.log(`The OTP for ${existingUser.email} is ${otp}`);
  } else {
    Users.push({ email, otp, password });
    console.log(`The OTP for ${email} is ${otp}`);
  }

  res.json({ message: "OTP generated, please check your email" });
});

// Endpoint to authenticate OTP and change password
app.post("/otpauth", async (req, res) => {
  const { email, password, otp } = req.body;
  if (!email || !password || !otp) {
    return res
      .status(400)
      .json({ message: "Email, password, and OTP are required" });
  }

  const existingUser = Users.find((user) => user.email === email);

  if (existingUser?.otp === otp) {
    existingUser!.password = password;
    console.log(
      `The password for ${existingUser!.email} has changed to ${password}`
    );
    res.json({
      message: "Password has been changed successfully",
      success: true,
    });
  } else {
    res
      .status(404)
      .json({
        message: "The OTP seems invalid, please try again",
        success: false,
      });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
