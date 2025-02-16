const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING, // Example: 'localhost/XE' or 'yourdb_high'
};

// Initialize Oracle DB Connection
async function initializeDB() {
  try {
    await oracledb.createPool(dbConfig);
    console.log("✅ Connected to Oracle Database");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
  }
}

initializeDB();

// Helper function to execute queries
async function executeQuery(query, binds = [], options = { autoCommit: true }) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, binds, options);
    return result;
  } catch (err) {
    console.error("❌ Query Execution Error:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("❌ Error closing connection:", err);
      }
    }
  }
}

// ------------------------------------
// 🚀 API Endpoints
// ------------------------------------

// ✅ 1. Signup API - Register a User
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const query = `INSERT INTO users (name, email, password) VALUES (:1, :2, :3)`;
  
  try {
    await executeQuery(query, [username, email, password]);
    res.status(200).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed!" });
  }
});

// ✅ 2. Login API - Authenticate a User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = :1 AND password = :2`;
  
  try {
    const result = await executeQuery(query, [email, password]);
    
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Login successful!", user: result.rows[0] });
    } else {
      res.status(401).json({ error: "Invalid email or password!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed!" });
  }
});

// ✅ 3. Fetch All Stories API
app.get("/stories", async (req, res) => {
  const query = `SELECT * FROM stories ORDER BY created_at DESC`;
  
  try {
    const result = await executeQuery(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stories!" });
  }
});

// ✅ 4. Fetch Single Story API (by ID)
app.get("/stories/:id", async (req, res) => {
  const storyId = req.params.id;
  const query = `SELECT * FROM stories WHERE id = :1`;
  
  try {
    const result = await executeQuery(query, [storyId]);
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Story not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch story!" });
  }
});

// ✅ 5. Submit Story API
app.post("/submit-story", async (req, res) => {
  const { title, content, author } = req.body;
  const query = `INSERT INTO stories (title, content, author) VALUES (:1, :2, :3)`;
  
  try {
    await executeQuery(query, [title, content, author]);
    res.status(200).json({ message: "Story submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit story!" });
  }
});

// ✅ 6. Delete Story API
app.delete("/stories/:id", async (req, res) => {
  const storyId = req.params.id;
  const query = `DELETE FROM stories WHERE id = :1`;
  
  try {
    await executeQuery(query, [storyId]);
    res.status(200).json({ message: "Story deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete story!" });
  }
});

// ✅ 7. Update Story API
app.put("/stories/:id", async (req, res) => {
  const storyId = req.params.id;
  const { title, content, author } = req.body;
  const query = `UPDATE stories SET title = :1, content = :2, author = :3 WHERE id = :4`;
  
  try {
    await executeQuery(query, [title, content, author, storyId]);
    res.status(200).json({ message: "Story updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update story!" });
  }
});

// ✅ 8. Health Check API (To Test if Backend is Running)
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.use(cors({ origin: "http://localhost:3002", credentials: true }));
