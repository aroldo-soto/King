"use client";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Counter:</h2>
      <div className="Counter-box">
        <button onClick={() => count > 0 && setCount((value) => value - 1)}>
          -
        </button>
        <span>{count}</span>
        <button onClick={() => setCount((value) => value + 1)}>+</button>
      </div>
    </div>
  );
};

export default Counter;
