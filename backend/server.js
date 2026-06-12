import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "DELETE", "PUT"],
  }),
);
app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});
app.use(express.json());
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Connection failed:", err));

// Your schemas and routes go here
const personSchema = new mongoose.Schema({
  indexi: Number,
  name: String,
  table: Array,
  datum: String,
});
const Person = mongoose.model("User", personSchema);

app.get("/people", async (req, res) => {
  const docs = await Person.find();
  res.json(docs);
});

app.post("/people", async (req, res) => {
  const newPerson = await Person.create(req.body);
  res.json(newPerson);
});

app.put("/people/:id", async (req, res) => {
  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, table: req.body.table },
    { new: true },
  );
  res.json(updatedPerson);
});

app.delete("/people/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port 3000"),
);
