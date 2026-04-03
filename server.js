import express from 'express';
import cors from 'cors';
import sqlite3Pkg from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const sqlite3 = sqlite3Pkg.verbose();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
// Creates a local database in the root folder
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Initialize Schema
db.serialize(() => {
  // Messages Table (For the Contact Form lead generation)
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Metrics Table (For the SaaS portfolio stats)
  db.run(`CREATE TABLE IF NOT EXISTS metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    month text NOT NULL,
    revenue INTEGER NOT NULL,
    users INTEGER NOT NULL
  )`);

  // Orders Table (For the Nova E-Commerce store logic)
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total DECIMAL(10, 2) NOT NULL,
    items_count INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  // Migration: add user_id column if it doesn't exist yet (for old databases)
  db.run(`ALTER TABLE orders ADD COLUMN user_id INTEGER`, () => {});


  // Users Table (For Authentication)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'Customer',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Products Table (For Nova Store)
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT 1
  )`);

  // Seed initial MOCK metrics for the SaaS dashboard if empty
  db.get("SELECT COUNT(*) as count FROM metrics", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO metrics (month, revenue, users) VALUES (?, ?, ?)");
      const data = [
        ['Jan', 4000, 2400],
        ['Feb', 3000, 1398],
        ['Mar', 5000, 9800],
        ['Apr', 4500, 3908],
        ['May', 6000, 4800],
        ['Jun', 5500, 3800],
        ['Jul', 7500, 4300],
      ];
      data.forEach(d => stmt.run(d));
      stmt.finalize();
      console.log('Seeded initial SaaS Metrics data.');
    }
  });

  // Seed default admin user and products
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO users (email, password, role) VALUES ('admin@cordex.com', 'admin123', 'admin')");
      console.log("Seeded default admin user.");
    }
  });

  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)");
      const defaultProducts = [
        ['Monolith Hoodie', 85.00, 'Apparel', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600'],
        ['Aether Sneakers', 140.00, 'Footwear', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600'],
        ['Void Cap', 35.00, 'Accessories', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600'],
        ['Nexus Backpack', 120.00, 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600']
      ];
      defaultProducts.forEach(p => stmt.run(p));
      stmt.finalize();
      console.log("Seeded default products data.");
    }
  });
});

// =======================
// API ROUTES
// =======================

// 1. CONTACT FORM ENDPOINT
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, message], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Simulate a slight delay to show off a realistic loading state on the front-end
    setTimeout(() => {
      res.status(201).json({ success: true, id: this.lastID });
    }, 1200);
  });
});

// 2. METRICS GET ENDPOINT
app.get('/api/metrics', (req, res) => {
  db.all("SELECT * FROM metrics ORDER BY id ASC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 3. ORDERS POST ENDPOINT (Checkout Simulation)
app.post('/api/orders', (req, res) => {
  const { total, items_count, user_id } = req.body;
  const uid = user_id || null;
  db.run(`INSERT INTO orders (total, items_count, user_id, status) VALUES (?, ?, ?, ?)`, [total, items_count, uid, 'Processed'], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, orderId: this.lastID });
  });
});

// 4. GET PRODUCTS ENDPOINT
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 5. POST PRODUCT ENDPOINT (Admin)
app.post('/api/products', (req, res) => {
  const { name, price, category, image } = req.body;
  db.run(`INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)`, 
    [name, price, category, image], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, productId: this.lastID });
  });
});

// 6. LOGIN ENDPOINT
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT id, email, role FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      res.json({ success: true, user: row });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// 7. GET MESSAGES ENDPOINT
app.get('/api/messages', (req, res) => {
  db.all("SELECT * FROM messages ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 8. DELETE MESSAGE ENDPOINT
app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM messages WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, deleted: this.changes });
  });
});

// 9. REGISTER ENDPOINT (Customer self-signup)
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
  db.run("INSERT INTO users (email, password, role) VALUES (?, ?, 'Customer')", [email, password], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
      }
      return res.status(500).json({ error: err.message });
    }
    db.get("SELECT id, email, role FROM users WHERE id = ?", [this.lastID], (err2, row) => {
      res.status(201).json({ success: true, user: row });
    });
  });
});

// 10. GET ORDERS BY USER ENDPOINT
app.get('/api/orders/:userId', (req, res) => {
  const { userId } = req.params;
  db.all("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// =======================
// PRODUCTION SERVING
// =======================
// Serve static frontend files from 'dist' folder
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Catch-all route to serve React's index.html for all non-API paths
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Cordex Werk Single-Node Stack running on http://localhost:${PORT}`);
  console.log(`Backend and Frontend combined.`);
});
