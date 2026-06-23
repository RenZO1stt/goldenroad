import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:8080", "https://frontend-rmgh.onrender.com"],
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
const korisnik = new mongoose.Schema({
  gmail: String,
  password: String,
});

const vjezbe = new mongoose.Schema({
  user: String,
  indexi: Number,
  name: String,
  table: Array,
  datum: String,
});

const vjezbeModel = mongoose.model("Vjezbe", vjezbe);
const korisnikModel = mongoose.model("Korisnik", korisnik);

app.post("/korisnik", async (req, res) => {
  const newKorisnik = await korisnikModel.create(req.body);
  res.json(newKorisnik);
});

app.get("/korisnik", async (req, res) => {
  const odabrani = await korisnikModel.find();
  res.json(odabrani);
});

app.get("/vjezbe", async (req, res) => {
  const docs = await vjezbeModel.find();
  res.json(docs);
});

app.post("/vjezbe", async (req, res) => {
  const newVjezbe = await vjezbeModel.create(req.body);
  res.json(newVjezbe);
});

app.put("/vjezbe/:id", async (req, res) => {
  const updatedVjezbe = await vjezbeModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, table: req.body.table },
    { new: true },
  );
  res.json(updatedVjezbe);
});

app.delete("/vjezbe/:id", async (req, res) => {
  await vjezbeModel.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port 3000"),
);
