import { NextRequest, NextResponse } from "next/server";
import { createProduct, getProducts, type ProductInput } from "@/lib/products-db";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const price = Number(body.price);
  const imageUrl =
    typeof body.imageUrl === "string" && body.imageUrl.trim()
      ? body.imageUrl.trim()
      : undefined;

  if (!title || !description || !category || !Number.isFinite(price) || price < 0) {
    return NextResponse.json(
      { error: "Faltan campos requeridos o son inválidos." },
      { status: 400 }
    );
  }

  const input: ProductInput = { title, description, category, price, imageUrl };
  const product = await createProduct(input);
  return NextResponse.json(product, { status: 201 });
}
