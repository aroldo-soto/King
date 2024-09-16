import styles from "./App.module.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "King: Your source for premium digital keys for games and software.",
  keywords: [
    "Digital keys",
    "Game keys",
    "Software keys",
    "Online game codes",
    "Premium digital products",
    "Affordable software licenses",
    "Instant delivery keys",
    "Secure digital downloads",
    "King keys",
    "Gaming deals",
  ],
};

const Home = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products`,
      {
        next: { revalidate: 60 },
      }
    );

    // Verificar si la respuesta es exitosa (status 200-299)
    if (!response.ok) {
      console.error("Error fetching products:", response.statusText);
      return (
        <main className={styles.App_main}>
          <h3 className={styles.App_txt_1}>Error</h3>
          <p className={styles.App_txt_2}>
            There was a problem loading the products. Please try again later.
          </p>
        </main>
      );
    }

    const products = await response.json();

    return (
      <main className={styles.App_main}>
        <h3 className={styles.App_txt_1}>Best sellers</h3>
        <p className={styles.App_txt_2}>
          Discover our best-sellers – a curated selection of top-rated digital
          keys for unbeatable gaming and software experiences. Explore customer
          favorites and elevate your digital world with reliability and
          excellence in every purchase.
        </p>
        <div className={styles.App_products}>
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className={styles.App_product}>
                <Image
                  src={product.image}
                  width={100}
                  height={100}
                  alt={product.name}
                />
                <h4 className={styles.App_txt_3}>{product.name}</h4>
                <span className={styles.App_txt_4}>$US {product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Failed to load products:", error);

    return (
      <main className={styles.App_main}>
        <h3 className={styles.App_txt_1}>Error</h3>
        <p className={styles.App_txt_2}>
          There was an unexpected error while loading the products. Please try
          again later.
        </p>
      </main>
    );
  }
};

export default Home;
