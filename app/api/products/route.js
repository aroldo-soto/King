import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const response = NextResponse.json(products, { status: 200 });

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=59"
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener los productos", error: error.message },
      { status: 500 }
    );
  }
}
