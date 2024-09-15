"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./Checkout.module.css";

export default function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    paymentMethod: "transferencia",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customerName: currentUser?.displayName || "Usuario Desconocido",
      customerEmail: currentUser?.email || "sin-correo@desconocido.com",
      orderDate: new Date().toISOString(),
      orderStatus: "pendiente",
      paymentMethod: formData.paymentMethod,
      totalAmount: getTotal(),
      items: cart,
      notes: formData.notes,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        alert("Orden completada con éxito");
        clearCart();
        router.push("/profile");
      } else {
        console.error("Error al enviar la orden");
      }
    } catch (error) {
      console.error("Error al procesar la orden:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Checkout</h1>

      {cart.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.productId} className={styles.cartItem}>
                <p>
                  <strong>{item.name}</strong> - Cantidad: {item.quantity} -
                  Precio: ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <h3>Total: ${getTotal().toFixed(2)}</h3>

          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <div className={styles.formGroup}>
              <label htmlFor="paymentMethod">Método de Pago</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                disabled
              >
                <option value="transferencia">Transferencia Bancaria</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="notes">Notas adicionales</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Notas para tu orden (opcional)"
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Completar Orden"}
            </button>
          </form>
        </>
      ) : (
        <p>No tienes productos en el carrito.</p>
      )}
    </div>
  );
}
