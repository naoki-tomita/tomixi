import { exec, get } from "../driver";
import { select, createTable } from "../driver/SQLBuilder";

export async function init() {
  await createTable("users")
    .ifNotExist()
    .constructor("user_id")
    .type("INTEGER")
    .notNull()
    .primaryKey()
    .autoIncrement()
    .next("login_id")
    .type("TEXT")
    .notNull()
    .next("password")
    .type("TEXT")
    .notNull()
    .exec();
  await createTable("sessions")
    .ifNotExist()
    .constructor("session_id")
    .type("INTEGER")
    .notNull()
    .primaryKey()
    .autoIncrement()
    .next("user_id")
    .type("INTEGER")
    .notNull()
    .next("session")
    .type("TEXT")
    .notNull()
    .exec();
}

interface RawSession {
  session_id: number;
  user_id: number;
  session: string;
}

interface RawUser {
  user_id: number;
  login_id: string;
  password: string;
}

interface Session {
  sessionId: number;
  userId: number;
  session: string;
}

interface User {
  userId: number;
  loginId: string;
}

async function getUser(id: string) {
  return select("*")
    .from<RawUser>("users")
    .where("login_id")
    .equal(id)
    .get();
}

async function getUserWithPassword(id: string, password: string) {
  return select("*")
    .from<RawUser>("users")
    .where("login_id")
    .equal(id)
    .and("password")
    .equal(password)
    .get();
}

async function registerUser(id: string, password: string) {
  return exec(`
    INSERT INTO users (login_id, password) VALUES("${id}", "${password}");
  `);
}

const sessionSeed = "abcdefghijklmnopqrstuvwxyz0123456789";
function generateSession() {
  return Array(12)
    .fill(null)
    .map(() => sessionSeed[Math.random() * sessionSeed.length])
    .join("");
}

async function registerSession(userId: number, session: string) {
  return exec(`
    INSERT INTO users (user_id, session) VALUES("${userId}", "${session}");
  `);
}

export async function register(
  id: string,
  password: string
): Promise<Session | null> {
  try {
    const user = await getUser(id);
    if (user) {
      return null;
    }
    await registerUser(id, password);
    const registeredUser = await getUser(id);
    const session = generateSession();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function login(
  id: string,
  password: string
): Promise<Session | null> {
  return null;
}

export async function identify(session: string): Promise<User | null> {
  return null;
}
