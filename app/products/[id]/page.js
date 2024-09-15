"use client";
import { useState, useEffect } from "react";
import styles from "./Product.module.css";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

async function getProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Producto no encontrado");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
}

const ProductPage = ({ params }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProduct(params.id);
      if (productData) {
        setProduct(productData);
      } else {
        setError("Producto no encontrado");
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.Product}>
      {product && (
        <>
          <Image
            src={product.image}
            width={400}
            height={400}
            alt={product.name}
            className={styles.Product_image}
          />
          <div className={styles.Product_details}>
            <h3 className={styles.Product_txt_1}>{product.name}</h3>
            <h4 className={styles.Product_txt_2}>{product.category}</h4>
            <p className={styles.Product_txt_3}>{product.description}</p>
            <div className={styles.Counter}>
              <button onClick={handleDecrement}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>

            <span>$US {product.price}</span>

            <button
              className={styles.Product_btn_1}
              onClick={() => addToCart(product, quantity)}
            >
              Add to cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
