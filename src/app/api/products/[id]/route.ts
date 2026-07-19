import { NextRequest, NextResponse } from "next/server";
import { deleteProduct, updateProduct } from "@/lib/products-db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const update: Record<string, unknown> = {};
  if (typeof body.title === "string") update.title = body.title.trim();
  if (typeof body.description === "string")
    update.description = body.description.trim();
  if (typeof body.category === "string") update.category = body.category.trim();
  if (body.price !== undefined) {
    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json({ error: "Precio inválido." }, { status: 400 });
    }
    update.price = price;
  }
  if (typeof body.imageUrl === "string") update.imageUrl = body.imageUrl.trim();

  const product = await updateProduct(id, update);
  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado." }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = await deleteProduct(id);
  if (!ok) {
    return NextResponse.json({ error: "Producto no encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
