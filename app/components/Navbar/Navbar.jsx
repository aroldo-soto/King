"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/products`
        );
        const products = await response.json();
        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className={styles.Navbar}>
      <div className={styles.leftSection}>
        <Link href="/">
          <h1 className={styles.Navbar_logo}>King</h1>
        </Link>
      </div>

      <nav className={styles.Navbar_nav}>
        {categories.map((category) => (
          <Link key={category} href={`/products/category/${category}`}>
            <h3 className={styles.Navbar_txt_2}>{category}</h3>
          </Link>
        ))}
      </nav>

      <div className={styles.rightSection}>
        <Link href="/profile">
          <FaUserCircle className={styles.icon} title="Perfil" />
        </Link>
        <Link href="/cart">
          <FaShoppingCart className={styles.icon} title="Carrito" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
