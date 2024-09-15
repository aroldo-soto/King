"use client";
import { useAuth } from "../context/AuthContext.js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./Admin.module.css";

export default function AdminPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const isAdmin = currentUser?.email === "coderhouseadmin@test.com";

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      router.push("/auth/login");
    }
  }, [currentUser, isAdmin, router]);

  if (!currentUser || !isAdmin) {
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Bienvenido al Panel Administrativo</h1>
      <p>
        Selecciona "Gestionar Productos" para administrar los productos de la
        tienda.
      </p>
    </div>
  );
}
