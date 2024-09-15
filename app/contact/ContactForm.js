"use client";
import { useState } from "react";

const ContactForm = () => {
  const [values, setValues] = useState({
    email: "",
    text: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      method: "POST",
      body: JSON.stringify(values),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="Write your Email"
        name="email"
        onChange={handleChange}
      />
      <textarea
        required
        placeholder="Write a message"
        name="text"
        onChange={handleChange}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
