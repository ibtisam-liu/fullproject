const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();

const app = express();

// ======================== MIDDLEWARE ========================
app.use(cors());
app.use(express.json());

// Serve images
app.use("/uploads", express.static("uploads"));

// ======================== DATABASE ==========================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) return console.log("DB Connection Error:", err);
  console.log("Connected to MySQL");
});

// ======================== REGISTER ==========================
app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const userRole = role || "user";

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database Error" });

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, userRole],
      (err) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({ message: "User registered successfully!" });
      }
    );
  });
});

// ======================== LOGIN =============================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET || "DEFAULT_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

// ======================== ADD TO CART =======================
app.post("/api/cart/add", (req, res) => {
  const { user_id, item_id, name, price, quantity } = req.body;

  if (!user_id) return res.status(400).json({ error: "User not logged in" });

  db.query(
    "INSERT INTO cart (user_id, item_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)",
    [user_id, item_id, name, price, quantity],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error", err });
      return res.json({ message: "Item added to cart!" });
    }
  );
});

// ======================== IMAGE UPLOAD ======================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ======================== ADD MENU ITEM =====================
app.post("/api/menu/add", upload.single("image"), (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "Name, price, and category are required" });
    }

    db.query(
      "INSERT INTO menu (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)",
      [name, description || "", price, category, image],
      (err, result) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ error: "Database insertion failed" });
        }

        res.status(201).json({
          message: "Menu item added successfully!",
          menuItem: {
            id: result.insertId,
            name,
            description,
            price,
            category,
            image: image ? `http://localhost:5000/uploads/${image}` : null,
          },
        });
      }
    );
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ======================== GET MENU ITEMS ====================
app.get("/api/menu", (req, res) => {
  db.query("SELECT * FROM menu", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// ======================== GET CART BY USER ==================
app.get("/api/cart/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const sql = `
    SELECT 
      c.id,
      c.user_id,
      c.item_id,
      c.name,
      c.price,
      c.quantity,
      m.image
    FROM cart c
    LEFT JOIN menu m ON c.item_id = m.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Cart fetch error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


// ======================== UPDATE CART QUANTITY ==============
app.post("/api/cart/update", (req, res) => {
  const { id, quantity } = req.body;

  db.query("UPDATE cart SET quantity = ? WHERE id = ?", [quantity, id], (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Quantity updated" });
  });
});

// ======================== DELETE CART ITEM ==================
app.delete("/api/cart/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM cart WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "Item removed" });
  });
});

// ======================== DEFAULT ROUTE =====================
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ======================== START SERVER ======================
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
