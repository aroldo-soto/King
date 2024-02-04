import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className={styles.Navbar}>
      <Link href={"/"}>
        <h3 className={styles.Navbar_txt_1}>King</h3>
      </Link>
      <nav className={styles.Navbar_nav}>
        <a className={styles.Navbar_txt_2}>PC</a>
        <a className={styles.Navbar_txt_2}>Xbox</a>
        <a className={styles.Navbar_txt_2}>PlayStation</a>
        <a className={styles.Navbar_txt_2}>Software</a>
      </nav>
    </header>
  );
};

export default Navbar;
