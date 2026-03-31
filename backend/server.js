const express = require("express");

const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("CampusCycle Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


let items = [];

app.post("/add-item", (req, res) => {
  const item = req.body;

  item.status = "available";   
  item.requests = [];         

  items.push(item);

  res.send("Item added successfully");
});


//view items
app.get("/items", (req, res) => {
  res.json(items);
});

//multiple students can send request
app.post("/request-item", (req, res) => {
  const { itemIndex, user } = req.body;

  if (!items[itemIndex]) {
    return res.send("Item not found");
  }

  items[itemIndex].requests.push(user);

  res.send("Request sent");
});