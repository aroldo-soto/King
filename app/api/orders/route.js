import { db } from "@/app/firebase/config";
import { NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    return NextResponse.json(
      { error: "Error al obtener las órdenes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.customerName || !data.customerEmail || !data.items) {
      return NextResponse.json(
        { error: "Faltan datos requeridos para crear la orden" },
        { status: 400 }
      );
    }

    const newOrderRef = await addDoc(collection(db, "orders"), data);
    const newOrder = { id: newOrderRef.id, ...data };

    return NextResponse.json(
      { message: "Orden creada con éxito", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return NextResponse.json(
      { error: "Error al crear la orden" },
      { status: 500 }
    );
  }
}
