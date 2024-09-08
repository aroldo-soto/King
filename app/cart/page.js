"use client";
import { useCart } from "@/app/Context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  return (
    <div className={styles.Cart}>
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id} className={styles.CartItem}>
              <div className={styles.CartItemDetails}>
                <h4>{product.name}</h4>
                <p>Categoría: {product.category}</p>
                <p>Precio: ${product.price}</p>
                <p>Cantidad:</p>
                <div className={styles.Counter}>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity - 1)
                    }
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className={styles.RemoveButton}
                onClick={() => removeFromCart(product.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className={styles.CartTotal}>
          <h3>Total: ${getTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
