import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return NextResponse.json(
        { id: productSnap.id, ...productSnap.data() },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener el producto", error: error.message },
      { status: 500 }
    );
  }
}
