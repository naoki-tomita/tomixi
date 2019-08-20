interface Cookie {
  name: string;
  value: string;
}

export function parse(cookie: string = ""): Cookie[] {
  return cookie
    .split(";")
    .map(it => it.trim())
    .filter(Boolean)
    .map(it => it.split("="))
    .map(([name, value]) => ({ name: name.toLowerCase(), value }));
}
