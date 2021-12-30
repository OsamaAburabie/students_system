const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/utils/connect");
dotenv.config();
const PORT = process.env.PORT || 3000;

//==================== MIDDLEWARES ============================
const app = express();
app.use(express.json());

//==================== SERVER LOGIC ============================
app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`);
  await connect();
});

//==================== ROUTES ============================
app.use("/api/health", require("./src/routes/health.routes"));

//==================== AUTH ROUTES ============================
app.use("/api/auth", require("./src/routes/auth.routes"));