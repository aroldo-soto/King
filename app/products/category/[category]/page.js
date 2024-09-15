import Image from "next/image";
import Link from "next/link";
import styles from "./Category.module.css";

async function getAllCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`
    );

    if (!response.ok) {
      throw new Error(
        `Error al obtener las categorías: ${response.statusText}`
      );
    }

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
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/products/category/${encodeURIComponent(category)}`
    );

    if (!response.ok) {
      throw new Error(`Error al obtener los productos: ${response.statusText}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      category: encodeURIComponent(category),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
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
