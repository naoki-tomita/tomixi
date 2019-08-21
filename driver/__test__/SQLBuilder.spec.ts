import { select, insertInto, createTable } from "../SQLBuilder";

describe("SQLBuilder", () => {
  describe("#select", () => {
    test("select from", () => {
      expect(
        select("foo")
          .from("foo")
          .build()
      ).toEqual("SELECT foo FROM foo;");
    });
    test("select many from", () => {
      expect(
        select("foo", "bar")
          .from("foo")
          .build()
      ).toEqual("SELECT foo, bar FROM foo;");
    });
    test("select from where = string", () => {
      expect(
        select("foo")
          .from<{ x: string }>("foo")
          .where("x")
          .equal("x")
          .build()
      ).toEqual(`SELECT foo FROM foo WHERE x = "x";`);
    });
    test("select from where = number", () => {
      expect(
        select("foo")
          .from<{ x: string }>("foo")
          .where("x")
          .equal(5)
          .build()
      ).toEqual(`SELECT foo FROM foo WHERE x = 5;`);
    });
    test("select from where or", () => {
      expect(
        select("foo")
          .from<{ x: string; y: string }>("foo")
          .where("x")
          .equal(5)
          .or("y")
          .isNotNull()
          .build()
      ).toEqual(`SELECT foo FROM foo WHERE x = 5 OR y IS NOT NULL;`);
    });
    test("select from where or", () => {
      expect(
        select("foo")
          .distinct()
          .from<{ x: string; y: string }>("foo")
          .where("x")
          .equal(5)
          .or("y")
          .isNotNull()
          .build()
      ).toEqual(`SELECT DISTINCT foo FROM foo WHERE x = 5 OR y IS NOT NULL;`);
    });
  });

  describe("#insertInto", () => {
    test("insert into foo values bar", () => {
      expect(
        insertInto<{ foo: string; bar: string }>("foo")
          .keys("foo", "bar")
          .values("10", 20)
          .build()
      ).toEqual(`INSERT INTO foo (foo, bar) VALUES("10", 20);`);
    });
  });

  describe("#createTable", () => {
    test("create table foo bar", () => {
      expect(
        createTable<{ foo: string; bar: string }>("foo")
          .ifNotExist()
          .constructor("foo")
          .type("TEXT")
          .notNull()
          .primaryKey()
          .autoIncrement()
          .next("bar")
          .type("INTEGER")
          .notNull()
          .autoIncrement()
          .build()
      ).toEqual(
        `CREATE TABLE IF NOT EXIST foo ( foo TEXT NOT NULL PRIMARY KEY AUTOINCREMENT, bar INTEGER NOT NULL AUTOINCREMENT);`
      );
    });
  });
});
