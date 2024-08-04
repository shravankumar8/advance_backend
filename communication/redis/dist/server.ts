const express = require("express");
const app = express();
const port = 3000;
app.use(express.json())
app.get("/name", (req, res) => {
  const name=req.body.name
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
