require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // ✅ ADD THIS

const app = express();

/* ======================
   CONNECT DATABASE
====================== */

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  console.log("🔥 Connected DB:", mongoose.connection.name); // shows DB name
})
.catch(err => console.log("DB Error:", err));


/* ======================
   MIDDLEWARE
====================== */

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:8081"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


/* ======================
   ROUTES
====================== */

app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/complaints", require("./src/routes/complaint"));
app.use("/api/officer", require("./src/routes/officer"));

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});


/* ======================
   START SERVER
====================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});