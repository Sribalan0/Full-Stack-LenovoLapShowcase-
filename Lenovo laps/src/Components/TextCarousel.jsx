// TextCarousel.jsx
import React, { useEffect, useState } from "react";

const messages = [
  "🔥 Exclusive Lenovo Laptop Deals!",
  "🎓 Special Discounts for Students!",
  "🚀 High Performance. Great Value!",
  "🛒 Shop Now and Save More!",
  "💻 Explore the Latest Lenovo Models!",
  "💻Suited for Gamers tooo!",
];

const TextCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{

        marginTop:"2%",
        width: "100%",
        background: "#111",
        color: "#ff4f81",
        padding: "0.8rem 1rem",
        fontSize: "1.2rem",
        textAlign: "center",
        fontWeight: "bold",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 10,
      }}
    >
      <span style={{ transition: "opacity 0.5s ease-in-out" }}>
        {messages[current]}
      </span>
    </div>
  );
};

export default TextCarousel;
