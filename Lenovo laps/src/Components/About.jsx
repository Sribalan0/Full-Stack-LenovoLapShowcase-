import React, { useEffect, useRef } from "react";
import "../App.css";
import { FaLaptop, FaUsers, FaHistory } from "react-icons/fa";

import img1 from "../assets/slim.avif";
import img2 from "../assets/shopping.webp";
import img3 from "../assets/71HMPbAf-iL._SX679_.jpg";
import img4 from "../assets/u2o87bi69godpx1qoh5z5fyjtmw1ir425939.avif";
import img5 from "../assets/ixaziyb8ymxfigq8cxr8utqqh8kncx356712.avif";

const laptopImages = [img1, img2, img3, img4, img5];

const About = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        padding: "2rem",
        Width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "1rem",
        animation: "fadeIn 1s ease-in-out",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        backgroundSize: "400% 400%",
        animationName: "gradientBG",
        animationDuration: "15s",
        animationTimingFunction: "ease",
        animationIterationCount: "infinite",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Left Text Section */}
      <div style={{ flex: 1 }}>
        <h1>About Sri's Lenovo Store</h1>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2>
            <FaLaptop style={{ color: "#00e0ff", marginRight: "8px" }} />
            Our Products
          </h2>
          <p>
           Sri's Lenovo Store is your one-stop destination for all things Lenovo — from the latest laptops and desktops to accessories and professional support. Founded in 2024, we have quickly built a reputation for offering genuine products, competitive prices, and exceptional customer service.
          </p>
        </section>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2>
            <FaUsers style={{ color: "#00e0ff", marginRight: "8px" }} />
            Our Team
          </h2>
          <p>
            Our dedicated team is committed to helping you find the perfect device for your needs.
          </p>
        </section>

        <section>
          <h2>
            <FaHistory style={{ color: "#00e0ff", marginRight: "8px" }} />
            Our History
          </h2>
          <p>
            Founded in 2024, Sri's Lenovo Store has quickly grown to become a trusted name in tech retail.
          </p>
        </section>
         <section>
          <h2>
            <FaLaptop style={{ color: "#00e0ff", marginRight: "8px" }} />
            Our Products
          </h2>
          <p>Our Products
At Sri's Lenovo Store, we carry a wide range of Lenovo devices designed to meet the needs of every kind of user:

Laptops: From ultra-portable notebooks like the ThinkPad X1 Carbon for business professionals, to powerful gaming laptops in the Legion series.

Desktops & Workstations: High-performance desktops for creative professionals, engineers, and gamers.

Accessories: Quality Lenovo-branded accessories including docking stations, monitors, keyboards, mice, and bags.

Smart Devices: Smart home and office solutions like smart displays, smart clocks, and wireless earbuds.

All products are sourced directly from Lenovo or authorized distributors, ensuring authenticity and warranty coverage.</p>
      
</section>
</div>

      {/* Right Scrolling Portrait Images */}
   
    </div>
  );
};

export default About;
