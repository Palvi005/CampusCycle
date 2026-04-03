const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("CampusCycle Backend Running 🚀");
});

/* ================= USERS SYSTEM ================= */

let users = [];

// SIGNUP
app.post("/signup", (req, res) => {
  const user = req.body;

  // check if user already exists
  const exists = users.find(u => u.email === user.email);

  if (exists) {
    return res.send("User already exists");
  }

  users.push(user);

  res.send("Signup successful");
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const foundUser = users.find(
    u => u.email === email && u.password === password
  );

  if (foundUser) {
    res.send("Login successful");
  } else {
    res.send("Invalid credentials");
  }
});

/* ================= ITEMS SYSTEM ================= */

let items = [];

// ADD ITEM
app.post("/add-item", (req, res) => {
  const item = req.body;

  item.status = "available";
  item.requests = [];

  items.push(item);

  res.send("Item added successfully");
});

// GET ITEMS
app.get("/items", (req, res) => {
  res.json(items);
});

// REQUEST ITEM
app.post("/request-item", (req, res) => {
  const { itemIndex, user } = req.body;

  if (!items[itemIndex]) {
    return res.send("Item not found");
  }

  items[itemIndex].requests.push(user);

  res.send("Request sent successfully");
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});