import { exec } from "../driver";

export async function init() {
  await exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      login_id    TEXT    NOT NULL,
      password    TEXT    NOT NULL
    );
  `);
  await exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      session_id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER NOT NULL,
      session     TEXT    NOT NULL
    );
  `);
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

export async function register(id: string, password: string): Session | null {

}

export async function login(id: string, password: string): Session | null {

}

export async function identify(session: string): User | null {

}
