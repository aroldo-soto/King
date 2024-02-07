import styles from "./App.module.css";
import Image from "next/image";
import Link from "next/link";
import { products } from "../mockData.js";

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

// export async function generateMetadata({ params, searchParams }, parent) {
//   const id = params.id;

//   const product = await fetch(`https://.../${id}`).then((res) => res.json());

//   return { title: product.title, description: product.description };
// }

export default function Home() {
  return (
    <main className={styles.App_main}>
      <h3 className={styles.App_txt_1}>Best sellers</h3>
      <p className={styles.App_txt_2}>
        Discover our best-sellers – a curated selection of top-rated digital
        keys for unbeatable gaming and software experiences. Explore customer
        favorites and elevate your digital world with reliability and excellence
        in every purchase.
      </p>
      <div className={styles.App_products}>
        {products.map((product) => {
          return (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className={styles.App_product}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className={styles.App_product_image}
                />
                <h4 className={styles.App_txt_3}>{product.name}</h4>
                <span className={styles.App_txt_4}>$US {product.price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
