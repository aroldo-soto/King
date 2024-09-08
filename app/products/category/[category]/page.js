import Image from "next/image";
import Link from "next/link";
import styles from "./Category.module.css";

async function getAllCategories() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();
    const categories = new Set(products.map((product) => product.category));
    return Array.from(categories);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return [];
  }
}

async function getProductsByCategory(category) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/category/${encodeURIComponent(
        category
      )}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener los productos por categoría");
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

const CategoryPage = async ({ params }) => {
  const { category } = params;
  const products = await getProductsByCategory(category);

  if (!products.length) {
    return <div>No se encontraron productos en esta categoría</div>;
  }

  return (
    <div className={styles.Category}>
      <h2>Productos en la categoría: {category}</h2>
      <div className={styles.ProductsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.ProductCard}>
            <Link href={`/products/${product.id}`}>
              <div>
                <Image
                  src={product.image}
                  width={200}
                  height={200}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
