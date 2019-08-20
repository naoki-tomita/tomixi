import { Database } from "sqlite3";

const db = new Database("./db.db");

export function get<T = any>(sql: string): Promise<T> {
  return new Promise((ok, ng) =>
    db.get(sql, (err, row) => (err ? ng(err) : ok(row)))
  );
}

export function all<T = any>(sql: string): Promise<T[]> {
  return new Promise((ok, ng) =>
    db.all(sql, (err, row) => (err ? ng(err) : ok(row)))
  );
}

export function exec<T = any>(sql: string): Promise<T[]> {
  return new Promise((ok, ng) => db.exec(sql, err => (err ? ng(err) : ok())));
}
