"use client";
import { useAuth } from "../context/AuthContext.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Profile.module.css";

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Perfil de Usuario</h1>

      {currentUser ? (
        <div className={styles.profileInfo}>
          <p>
            <strong>Nombre:</strong> {currentUser.displayName || "Usuario"}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          {currentUser.email === "coderhouseadmin@test.com" && (
            <Link href="/admin">
              <button className={styles.adminButton}>Ir al Panel Admin</button>
            </Link>
          )}

          <button onClick={handleLogout} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className={styles.authOptions}>
          <p>No has iniciado sesión.</p>
          <div className={styles.buttonsContainer}>
            <Link href="/auth/login">
              <button className={styles.loginButton}>Iniciar Sesión</button>
            </Link>
            <Link href="/auth/register">
              <button className={styles.registerButton}>Registrarse</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
