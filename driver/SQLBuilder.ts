import { all, exec, get } from ".";

function execFactory<T>(sql: string) {
  return function() {
    return exec<T>(`${sql};`);
  };
}

function allFactory<T>(sql: string) {
  return function() {
    return all<T>(`${sql};`);
  };
}

function getFactory<T>(sql: string) {
  return function() {
    return get<T>(`${sql};`);
  };
}

function buildFactory(sql: string) {
  return function() {
    return `${sql};`;
  };
}

function compareable<T>(sql: string) {
  return {
    in: inFactory<T>(sql),
    equal: equalFactory<T>(sql),
    like: likeFactory<T>(sql),
    notEqual: notEqualFactory<T>(sql),
    between: betweenFactory<T>(sql),
    isNull: isNullFactory<T>(sql),
    isNotNull: isNotNullFactory<T>(sql)
  };
}

function isNotNullFactory<T>(prefix: string) {
  return function() {
    const sql = `${prefix} IS NOT NULL`;
    return {
      and: andFactory<T>(sql),
      or: orFactory<T>(sql),
      orderBy: orderByFactory<T>(sql),
      exec: execFactory<T>(sql),
      build: buildFactory(sql)
    };
  };
}

function connectable<T>(sql: string) {
  return {
    and: andFactory<T>(sql),
    or: orFactory<T>(sql)
  };
}

function executable<T>(sql: string) {
  return {
    exec: execFactory<T>(sql),
    get: getFactory<T>(sql),
    all: allFactory<T>(sql),
    build: buildFactory(sql)
  };
}

function isNullFactory<T>(prefix: string) {
  return function() {
    const sql = `${prefix} IS NULL`;
    return {
      ...connectable<T>(sql),
      orderBy: orderByFactory<T>(sql),
      ...executable<T>(sql)
    };
  };
}

function orderByFactory<T>(prefix: string) {
  return function(columnName: keyof T) {
    const sql = `${prefix} ORDER BY ${columnName}`;
    return executable<T>(sql);
  };
}

function andFactory<T>(prefix: string) {
  return function(columnName: keyof T) {
    const sql = `${prefix} AND ${columnName}`;
    return compareable<T>(sql);
  };
}

function orFactory<T>(prefix: string) {
  return function(columnName: keyof T) {
    const sql = `${prefix} OR ${columnName}`;
    return compareable<T>(sql);
  };
}

function inFactory<T>(prefix: string) {
  return function(...parameters: Array<number | string>) {
    const sql = `${prefix} IN (${parameters.map(wrap).join(", ")})`;
    return {
      ...connectable<T>(sql),
      orderBy: orderByFactory<T>(sql),
      ...executable<T>(sql)
    };
  };
}

function wrap(parameter: number | string) {
  return typeof parameter === "number" ? `${parameter}` : `"${parameter}"`;
}

function betweenFactory<T>(prefix: string) {
  return function(parameter: number | string) {
    const sql = `${prefix} BETWEEN ${wrap(parameter)}`;
    return {
      and: andFactory<T>(sql)
    };
  };
}

function createCompareFactory(compareMethod: string) {
  return function<T>(prefix: string) {
    return function(parameter: number | string) {
      const sql = `${prefix} ${compareMethod} ${wrap(parameter)}`;
      return {
        ...connectable<T>(sql),
        orderBy: orderByFactory<T>(sql),
        ...executable<T>(sql)
      };
    };
  };
}

const notEqualFactory = createCompareFactory("<>");
const likeFactory = createCompareFactory("LIKE");
const equalFactory = createCompareFactory("=");

function whereFactory<T>(prefix: string) {
  return function(columnName: keyof T) {
    const sql = `${prefix} WHERE ${columnName}`;
    return compareable<T>(sql);
  };
}

function fromFactory(prefix: string) {
  return function<T>(tableName: string) {
    const sql = `${prefix} FROM ${tableName}`;
    return {
      where: whereFactory<T>(sql),
      orderBy: orderByFactory<T>(sql),
      ...executable<T>(sql)
    };
  };
}

function distinctFactory(...params: string[]) {
  return function() {
    const sql = `SELECT DISTINCT ${params.join(", ")}`;
    return {
      from: fromFactory(sql)
    };
  };
}

export function select(...params: string[]) {
  const sql = `SELECT ${params.join(", ")}`;
  return {
    from: fromFactory(sql),
    distinct: distinctFactory(...params)
  };
}

function valuesFactory<T>(prefix: string) {
  return function(...values: Array<string | number>) {
    const sql = `${prefix} VALUES(${values.map(wrap).join(", ")})`;
    return {
      build: buildFactory(sql),
      exec: execFactory<T>(sql)
    };
  };
}

function keysFactory<T>(prefix: string) {
  return function(...keys: (keyof T)[]) {
    const sql = `${prefix} (${keys.join(", ")})`;
    return {
      values: valuesFactory<T>(sql)
    };
  };
}

export function insertInto<T>(tableName: string) {
  const sql = `INSERT INTO ${tableName}`;
  return {
    keys: keysFactory<T>(sql)
  };
}

function nextable<T>(sql: string) {
  return {
    autoIncrement: autoIncrementFactory<T>(sql),
    primaryKey: primaryKeyFactory<T>(sql),
    notNull: notNullFactory<T>(sql),
    unique: uniqueFactory<T>(sql),
    next: constructorFactory(`${sql},`),
    build: buildFactory(`${sql})`),
    exec: execFactory<T>(`${sql})`)
  };
}

function uniqueFactory<T>(prefix: string) {
  return function() {
    const sql = `${prefix} UNIQUE`;
    return nextable<T>(sql);
  };
}

function autoIncrementFactory<T>(prefix: string) {
  return function() {
    const sql = `${prefix} AUTOINCREMENT`;
    return nextable<T>(sql);
  };
}

function primaryKeyFactory<T>(prefix: string) {
  return function() {
    const sql = `${prefix} PRIMARY KEY`;
    return nextable<T>(sql);
  };
}

function notNullFactory<T>(prefix: string) {
  return function() {
    const sql = `${prefix} NOT NULL`;
    return nextable<T>(sql);
  };
}

type DataType = "TEXT" | "INTEGER";
function typeFactory<T>(prefix: string) {
  return function(type: DataType) {
    const sql = `${prefix} ${type}`;
    return nextable<T>(sql);
  };
}

function constructorFactory<T>(prefix: string) {
  return function(key: string) {
    const sql = `${prefix} ${key}`;
    return {
      type: typeFactory<T>(sql)
    };
  };
}

function ifNotExistFactory<T>(tableName: string) {
  return function() {
    return {
      constructor: constructorFactory<T>(
        `CREATE TABLE IF NOT EXISTS ${tableName} (`
      )
    };
  };
}

export function createTable<T>(tableName: string) {
  return {
    ifNotExist: ifNotExistFactory<T>(tableName),
    constructor: constructorFactory<T>(`CREATE TABLE ${tableName}`)
  };
}
