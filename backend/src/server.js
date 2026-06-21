const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();


app.use(
  cors({
    origin: "http://localhost:8080", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,
  })
);

app.use(express.json());


connectDB();



app.use("/api/auth", require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaint"));
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
