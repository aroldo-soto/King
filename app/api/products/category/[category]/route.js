import { db } from "../../../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const category = decodeURIComponent(params.category);

  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No se encontraron productos en esta categoría" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error al obtener los productos de la categoría",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
