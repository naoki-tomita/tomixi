import { exec, get } from "../driver";
import { select, createTable, insertInto } from "../driver/SQLBuilder";

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
    .unique()
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

function getUser(id: string) {
  return select("*")
    .from<RawUser>("users")
    .where("login_id")
    .equal(id)
    .get();
}

function getUserWithPassword(id: string, password: string) {
  return select("*")
    .from<RawUser>("users")
    .where("login_id")
    .equal(id)
    .and("password")
    .equal(password)
    .get();
}

function getUserById(userId: number) {
  return select("*").from<RawUser>("users").where("user_id").equal(userId).get();
}

function registerUser(id: string, password: string) {
  return insertInto<RawUser>("users")
    .keys("login_id", "password")
    .values(id, password)
    .exec();
}

const SessionSeed = "abcdefghijklmnopqrstuvwxyz0123456789";
function generateSession() {
  return new Array(12)
    .fill(null)
    .map(() => SessionSeed[Math.floor(Math.random() * SessionSeed.length)])
    .join("");
}

function registerSession(userId: number, session: string) {
  return insertInto<RawSession>("sessions")
    .keys("user_id", "session")
    .values(userId, session)
    .exec();
}

function getSession(userId: number, session: string) {
  return select("*")
    .from<RawSession>("sessions")
    .where("user_id")
    .equal(userId)
    .and("session")
    .equal(session)
    .get();
}

function getSessionBySession(session: string) {
  return select("*").from<RawSession>("sessions").where("session").equal(session).get();
}

function toSession(raw: RawSession): Session {
  return {
    userId: raw.user_id,
    session: raw.session,
    sessionId: raw.session_id
  };
}

function toUser(raw: RawUser): User {
  return { loginId: raw.login_id, userId: raw.user_id };
}

export async function register(
  id: string,
  password: string
): Promise<Session | null> {
  try {
    const user = await getUser(id);
    if (user) {
      console.log(`user already exist. id: ${id}`);
      return null;
    }
    await registerUser(id, password);
    const registeredUser = await getUser(id);
    const session = generateSession();
    await registerSession(registeredUser.user_id, session);
    const createdSession = await getSession(registeredUser.user_id, session);
    return toSession(createdSession);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function login(
  id: string,
  password: string
): Promise<Session | null> {
  const user = await getUser(id);
  if (!user) {
    console.log(`user not found. id: ${id}`);
    return null;
  }
  if (user.password !== password) {
    console.log(`password is incorrect.`);
    return null;
  }
  const session = generateSession();
  await registerSession(user.user_id, session);
  const createdSession = await getSession(user.user_id, session);
  return toSession(createdSession);
}

export async function identify(session: string): Promise<User | null> {
  const resolvedSession = await getSessionBySession(session);
  if (!resolvedSession) {
    console.log(`Session not found. session: ${session}`);
    return null;
  }
  const user = await getUserById(resolvedSession.user_id);
  if (!user) {
    console.log(`User not found. session info: ${JSON.stringify(session)}`);
    return null;
  }
  return toUser(user);
}
