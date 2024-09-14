"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import styles from "./Orders.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  return (
    <div className={styles.ordersContainer}>
      <h1>Órdenes Registradas</h1>
      {orders.length > 0 ? (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerEmail}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => toggleOrder(order.id)}
                      className={styles.toggleButton}
                    >
                      {expandedOrder === order.id ? "Ocultar" : "Ver Productos"}
                    </button>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan="6">
                      <div className={styles.productsList}>
                        <h4>Productos en la orden:</h4>
                        <ul>
                          {order.items.map((item, index) => (
                            <li key={index}>
                              <strong>{item.name}</strong> - Cantidad:{" "}
                              {item.quantity} - Precio: ${item.price.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay órdenes registradas.</p>
      )}
    </div>
  );
}
