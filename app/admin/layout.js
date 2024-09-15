"use client";
import Link from "next/link";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link href="/admin/products">Gestionar Productos</Link>
          </li>
          <li>
            <Link href="/admin/orders">Ver Órdenes</Link>{" "}
          </li>
        </ul>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
