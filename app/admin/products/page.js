"use client";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import styles from "./Products.module.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: null,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const uploadImage = async (imageFile) => {
    const storageRef = ref(storage, `products/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleAddProduct = async () => {
    try {
      if (
        newProduct.name &&
        newProduct.price &&
        newProduct.category &&
        newProduct.stock &&
        imageFile
      ) {
        const imageUrl = await uploadImage(imageFile);
        await addDoc(collection(db, "products"), {
          ...newProduct,
          image: imageUrl,
        });
        setNewProduct({
          name: "",
          price: "",
          description: "",
          category: "",
          stock: "",
          image: null,
        });
        setImageFile(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const handleUpdateProduct = async () => {
    const productDoc = doc(db, "products", editProduct.id);
    await updateDoc(productDoc, {
      name: editProduct.name,
      price: editProduct.price,
      description: editProduct.description,
      category: editProduct.category,
      stock: editProduct.stock,
    });
    setEditProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Productos</h1>

      <div className={styles.addProductSection}>
        <h2>Añadir nuevo producto</h2>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className={styles.input}
          />
          <textarea
            placeholder="Descripción"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className={styles.textarea}
          />
          <input
            type="text"
            placeholder="Categoría"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            className={styles.input}
          />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className={styles.input}
          />
          <button onClick={handleAddProduct} className={styles.button}>
            Añadir Producto
          </button>
        </div>
      </div>

      {/* Lista de productos */}
      <h2 className={styles.subtitle}>Lista de productos</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ul className={styles.productList}>
          {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
              {editProduct?.id === product.id ? (
                <>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="number"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                    className={styles.input}
                  />
                  <textarea
                    value={editProduct.description}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        description: e.target.value,
                      })
                    }
                    className={styles.textarea}
                  />
                  <button
                    onClick={handleUpdateProduct}
                    className={styles.button}
                  >
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.productDetails}>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className={styles.actions}>
                    <button
                      onClick={() => setEditProduct(product)}
                      className={styles.button}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;
