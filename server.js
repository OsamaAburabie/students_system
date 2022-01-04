const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/utils/connect");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 3000;
//==================== MIDDLEWARES ============================
const app = express();
app.use(cors());
app.use(express.json());
//==================== SERVER LOGIC ===========================
app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`);
  await connect();
});
//==================== ROUTES =================================
app.use("/api/health", require("./src/routes/health.routes"));
//==================== AUTH ROUTES ============================
app.use("/api/auth", require("./src/routes/auth.routes"));
//==================== ADMIN ROUTES ============================
app.use("/api/admin", require("./src/routes/admin.routes"));
//==================== GUARD ROUTES ============================
app.use("/api/guard", require("./src/routes/guard.routes"));
//==================== STUDENT ROUTES ============================
app.use("/api/student", require("./src/routes/student.routes"));
