const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();


app.use(express.json());
app.use(
  cors({
    origin: "https://cmas-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/certifications", require("./routes/certRoutes"));

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
