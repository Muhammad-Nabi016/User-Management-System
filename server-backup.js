
const express = require("express");

const app = express();
const PORT = 3000;

// JSON request body ko read karne ke liye
app.use(express.json());

// Temporary users data
let users = [
  { id: 1, name: "Ali", email: "ali@example.com" },
  { id: 2, name: "Ahmed", email: "ahmed@example.com" }
];

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to User Management System API!");
});

// 1. READ: Tamam users hasil karo
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// 2. READ: Ek specific user hasil karo
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// 3. CREATE: Naya user add karo
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  const newUser = {
    id: users.length
      ? Math.max(...users.map((u) => u.id)) + 1
      : 1,
    name: name.trim(),
    email: email.trim()
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

// 4. UPDATE: User ki details update karo
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  user.name = name.trim();
  user.email = email.trim();

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});

// 5. DELETE: User remove karo
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1)[0];

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser
  });
});

// Server start karo
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
