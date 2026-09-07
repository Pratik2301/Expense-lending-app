// db.js
// This file is the ONLY place that talks to the database file directly.
// Every other file that needs data goes through the functions exported here.
// Using SQLite (via better-sqlite3) means the "database" is just a single
// file on disk (data.db) — no separate database server to install or run.

import { DatabaseSync } from "node:sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// DatabaseSync is Node's OWN built-in SQLite (added in Node 22.5+, stable in
// later versions) — no native module to compile, so no node-gyp/Xcode issues.
const db = new DatabaseSync(path.join(__dirname, "data.db"));

// Create tables if they don't already exist.
// This runs once every time the server starts — safe to run repeatedly.
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS lendings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_name TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('lent', 'borrowed')),
    date TEXT NOT NULL,
    due_date TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'settled')),
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
