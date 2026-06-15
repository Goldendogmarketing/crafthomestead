import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Read-only filesystem (e.g. Vercel serverless) — nothing to create.
  }
}

export async function readCollection<T>(file: string, seed: T): Promise<T> {
  await ensureDir();
  const full = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(full, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    // First run seeds the file. On a read-only filesystem the write fails, so
    // fall back to the in-memory seed — reads (landing/shop) still succeed.
    try {
      await fs.writeFile(full, JSON.stringify(seed, null, 2), "utf-8");
    } catch {
      // ignore — non-persistent environment
    }
    return seed;
  }
}

export async function writeCollection<T>(file: string, data: T): Promise<void> {
  await ensureDir();
  const full = path.join(DATA_DIR, file);
  try {
    await fs.writeFile(full, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Read-only filesystem (e.g. Vercel serverless): admin/shop writes don't
    // persist. Swallow so demo deploys don't 500; use a real DB for production.
  }
}

export function genId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
