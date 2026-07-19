import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET no está configurado.");
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  return true;
}

export function checkCredentials(user: string, password: string): boolean {
  const validUser = process.env.ADMIN_USER ?? "";
  const validPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!validUser || !validPassword) return false;

  const userBuf = Buffer.from(user);
  const validUserBuf = Buffer.from(validUser);
  const passBuf = Buffer.from(password);
  const validPassBuf = Buffer.from(validPassword);

  const userMatch =
    userBuf.length === validUserBuf.length && timingSafeEqual(userBuf, validUserBuf);
  const passMatch =
    passBuf.length === validPassBuf.length && timingSafeEqual(passBuf, validPassBuf);

  return userMatch && passMatch;
}

export { COOKIE_NAME };
