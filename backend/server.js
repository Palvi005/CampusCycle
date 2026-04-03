const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CampusCycle Backend Running 🚀");
});

// In-memory database (Resets when server restarts)
let users = [];
let items = [];

// --- User Auth ---
app.post("/signup", (req, res) => {
  const user = req.body;
  const exists = users.find((u) => u.email === user.email);
  if (exists) return res.status(400).send("User already exists");

  users.push(user);
  res.send("Signup successful");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find(
    (u) => u.email === email && u.password === password,
  );
  if (foundUser) {
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// --- Items Logic ---
app.post("/add-item", (req, res) => {
  const item = {
    ...req.body,
    status: "available",
    requests: [],
  };
  items.push(item);
  res.send("Item added successfully");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/request-item", (req, res) => {
  const { itemIndex, user } = req.body;
  if (!items[itemIndex]) return res.status(404).send("Item not found");

  items[itemIndex].requests.push(user);
  res.send("Request sent successfully");
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
