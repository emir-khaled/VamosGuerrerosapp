// Database layer. Runs only in the main process.
const path = require('path');
const Database = require('better-sqlite3');

let db;

function open(userDataDir) {
  const file = path.join(userDataDir, 'app.db');
  db = new Database(file);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  seedIfEmpty();
  return file;
}

function seedIfEmpty() {
  const count = db.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE type = 'table'").get().n;
  if (count > 0) return;

  db.exec(`
    CREATE TABLE notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT,   
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    INSERT INTO notes (title, body) VALUES
      ('First note', 'Hello from SQLite'),
      ('Second note', 'Try editing me with an UPDATE'),
      ('Third note', 'Or delete me');
  `);
}

// Runs a single SQL string. Returns a plain, serializable result object.
function run(sql, params = []) {
  const started = performance.now();
  const text = sql.trim();
  if (!text) throw new Error('Enter a SQL statement to run.');

  let stmt;
  try {
    stmt = db.prepare(text);
  } catch (err) {
    // prepare() accepts one statement only; fall back to exec() for scripts.
    if (/more than one statement/i.test(err.message)) {
      db.exec(text);
      return { kind: 'exec', ms: elapsed(started) };
    }
    throw err;
  }

  if (stmt.reader) {
    const rows = stmt.all(...params);
    const columns = stmt.columns().map((c) => c.name);
    return { kind: 'rows', columns, rows, ms: elapsed(started) };
  }

  const info = stmt.run(...params);
  return {
    kind: 'changes',
    changes: info.changes,
    lastInsertRowid: Number(info.lastInsertRowid),
    ms: elapsed(started),
  };
}

function listTables() {
  return db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    .all()
    .map((r) => r.name);
}

function elapsed(t) {
  return Math.round((performance.now() - t) * 100) / 100;
}

function close() {
  if (db) db.close();
}

module.exports = { open, run, listTables, close };
 