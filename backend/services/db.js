import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = process.env.DB_DATA_DIR ? path.resolve(process.env.DB_DATA_DIR) : path.resolve('data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure database file and directory exist
function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], searches: [] }, null, 2));
  }
}

initDb();

// Load the JSON database from disk
function loadDb() {
  try {
    initDb();
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading database file:", e);
    return { users: [], searches: [] };
  }
}

// Save the database back to disk
function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error writing to database file:", e);
  }
}

// Password utility using native crypto PBKDF2
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
  return { salt, hash };
}

export function verifyPassword(password, salt, hash) {
  const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
  return checkHash === hash;
}

// Database wrapper functions
export const db = {
  users: {
    findByEmail: (email) => {
      const dbData = loadDb();
      return dbData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    },
    findById: (id) => {
      const dbData = loadDb();
      return dbData.users.find(u => u.id === id);
    },
    create: (email, password, name = "") => {
      const dbData = loadDb();
      const existing = dbData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        throw new Error("User already exists with this email address.");
      }
      
      const { salt, hash } = hashPassword(password);
      const newUser = {
        id: crypto.randomBytes(8).toString('hex'),
        email: email.toLowerCase(),
        name: name.trim(),
        passwordHash: hash,
        salt: salt,
        createdAt: new Date().toISOString()
      };
      
      dbData.users.push(newUser);
      saveDb(dbData);
      
      // Return user without credentials
      return { id: newUser.id, email: newUser.email, name: newUser.name, createdAt: newUser.createdAt };
    }
  },
  searches: {
    findByUser: (userId) => {
      const dbData = loadDb();
      return dbData.searches
        .filter(s => s.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    create: (userId, company, resultJson) => {
      const dbData = loadDb();
      
      const newSearch = {
        id: crypto.randomBytes(8).toString('hex'),
        userId,
        company,
        recommendation: resultJson.recommendation || resultJson.decision || "Watchlist",
        score: resultJson.scores?.total || resultJson.score || 0,
        resultJson: resultJson,
        createdAt: new Date().toISOString()
      };
      
      // Filter out duplicate searches for the same company by the same user to keep history clean
      dbData.searches = dbData.searches.filter(
        s => !(s.userId === userId && s.company.toLowerCase() === company.toLowerCase())
      );
      
      dbData.searches.push(newSearch);
      saveDb(dbData);
      return newSearch;
    }
  }
};
