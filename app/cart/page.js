"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, getTotal } = useCart();

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Carrito de Compras</h1>

      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Tu carrito está vacío.</p>
          <Link href="/" passHref>
            <button className={styles.homeButton}>Volver a la tienda</button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.productId} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <p className={styles.itemTotal}>
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h3>Total a pagar: ${getTotal().toFixed(2)}</h3>
            <Link href="/checkout" passHref>
              <button className={styles.checkoutButton}>Ir al Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
