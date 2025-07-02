import React from "react";
import { FaTools, FaTruck, FaHandshake, FaLaptopMedical } from "react-icons/fa";
import "../App.css";

const consultationImg = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80";

const warrantyImg = "https://images.unsplash.com/photo-1581093448792-5a69b742fa2a?auto=format&fit=crop&w=600&q=80"; // <-- added this
const bulkSalesImg = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80";
const deliveryImg = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80";
const mainImg = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80";

const Services = () => {
  return (
    <div className="services-page-container">
      <div className="services-content">
        <h1 className="services-title">Our Services</h1>

        <section className="service-section fade-in">
          <h2>
            <FaTools className="service-icon" />
            Product Consultation & Recommendations
          </h2>
          <div className="service-content-with-image">
            <p>
              Get expert advice to choose the perfect Lenovo device tailored to your needs.
            </p>
            <img
              src={consultationImg}
              alt="Product Consultation"
              className="service-image"
              loading="lazy"
            />
          </div>
        </section>

        <section className="service-section fade-in" style={{ animationDelay: "0.3s" }}>
          <h2>
            <FaLaptopMedical className="service-icon" />
            Warranty & Repairs
          </h2>
          <div className="service-content-with-image">
            <p>
              Certified technicians provide authorized Lenovo warranty repairs and upgrades.
            </p>
            <img
              src={warrantyImg}
              alt="Warranty and Repairs"
              className="service-image"
              loading="lazy"
            />
          </div>
        </section>

        <section className="service-section fade-in" style={{ animationDelay: "0.6s" }}>
          <h2>
            <FaHandshake className="service-icon" />
            Business & Bulk Sales
          </h2>
          <div className="service-content-with-image">
            <p>
              Custom solutions and discounts for businesses, schools, and institutions.
            </p>
            <img
              src={bulkSalesImg}
              alt="Business and Bulk Sales"
              className="service-image"
              loading="lazy"
            />
          </div>
        </section>

        <section className="service-section fade-in" style={{ animationDelay: "0.9s" }}>
          <h2>
            <FaTruck className="service-icon" />
            Delivery & Installation
          </h2>
          <div className="service-content-with-image">
            <p>
              Fast delivery and professional setup services for your convenience.
            </p>
            <img
              src={deliveryImg}
              alt="Delivery and Installation"
              className="service-image"
              loading="lazy"
            />
          </div>
        </section>
      </div>

      {/* Main static image on right */}
      <div className="static-image-container">
        <img
          src={mainImg}
          alt="Laptop"
          className="static-laptop-image"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Services;
