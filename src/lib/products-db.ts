import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

export type ProductInput = {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
};

const dataFile = path.join(process.cwd(), "data", "products.json");

async function readAll(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

async function writeAll(products: Product[]) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(products, null, 2), "utf-8");
}

export async function getProducts(): Promise<Product[]> {
  const products = await readAll();
  return products.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const products = await readAll();
  return products.find((p) => p.id === id);
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const products = await readAll();
  const product: Product = {
    id: randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  await writeAll(products);
  return product;
}

export async function updateProduct(
  id: string,
  input: Partial<ProductInput>
): Promise<Product | undefined> {
  const products = await readAll();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  products[index] = { ...products[index], ...input };
  await writeAll(products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await readAll();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  await writeAll(next);
  return true;
}
