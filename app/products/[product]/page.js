import styles from "./Product.module.css";
import Image from "next/image";
import { products } from "@/mockData";
import Counter from "@/components/Counter/Counter";

export async function generateMetadata({ params, searchParams }, parent) {
  const product = products.find((product) => product.id == params.product);

  return {
    title: `¡Buy ${product.name}!`,
  };
}

const Products = ({ params }) => {
  const product = products.find((product) => product.id == params.product);

  return (
    <div className={styles.Product}>
      <Image src={product.image} />
      <div className={styles.Product_details}>
        <h3 className={styles.Product_txt_1}>{product.name}</h3>
        <h4 className={styles.Product_txt_2}>{product.category}</h4>
        <p className={styles.Product_txt_3}>{product.description}</p>
        <Counter />
        <span>$US {product.price}</span>

        <button className={styles.Product_btn_1}>Add to cart</button>
      </div>
    </div>
  );
};

export default Products;
