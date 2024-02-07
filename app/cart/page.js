import styles from "./Cart.module.css";
import Link from "next/link";

const Cart = () => {
  return (
    <div className={styles.Cart}>
      <h3 className={styles.Cart_txt_1}>Add products to your cart!</h3>
      <Link href={"/"} className={styles.Cart_btn_1}>
        Explore products
      </Link>
    </div>
  );
};

export default Cart;
