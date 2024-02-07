"use client";
import { useState } from "react";
import styles from "./Counter.module.css";

const Counter = () => {
  const [count, setCount] = useState(1);

  return (
    <div className={styles.Counter}>
      <button
        className={styles.Counter_btn_1}
        onClick={() => count > 1 && setCount((value) => value - 1)}
      >
        -
      </button>
      <span className={styles.Counter_count}>{count}</span>
      <button
        className={styles.Counter_btn_1}
        onClick={() => setCount((value) => value + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
