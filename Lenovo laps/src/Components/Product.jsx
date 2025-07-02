import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CartContext } from "./CartContext";
import axios from "axios";

const StarRating = ({ rating, maxStars = 5 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  for (let i = 1; i <= maxStars; i++) {
    if (i <= fullStars) {
      stars.push(
        <span key={i} style={{ color: "#f5b50a", fontSize: "1.2rem" }}>
          ★
        </span>
      );
    } else if (i === fullStars + 1 && halfStar) {
      stars.push(
        <span key={i} style={{ color: "#f5b50a", fontSize: "1.2rem" }}>
          ⯨
        </span>
      );
    } else {
      stars.push(
        <span key={i} style={{ color: "#ccc", fontSize: "1.2rem" }}>
          ☆
        </span>
      );
    }
  }
  return <span>{stars}</span>;
};

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin flag from localStorage
    const adminFlag = localStorage.getItem("isAdmin");
    setIsAdmin(adminFlag === "true");

    const fetchProduct = async () => {
      // Try getting from location.state first
      if (location.state?.laptop) {
        setProduct(location.state.laptop);
        setLoading(false);
      } else {
        // fallback: fetch from backend
        try {
          const response = await axios.get(`http://localhost:8080/api/laptops/${id}`);
          setProduct(response.data);
        } catch (err) {
          console.error("Failed to load product:", err);
          setProduct(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, location.state]);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading product...</div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "5rem", textAlign: "center" }}>
        <h2>Product details not available.</h2>
        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to cart!");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/laptops/${product.id}`);
      alert("Product deleted successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete product: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          width:"160%",
          marginTop:"-2%",
          marginLeft:"-25%",
          padding: "1rem 2rem",
          backgroundColor: "#111",
          color: "#fff",
          borderRadius: "6px",
          marginBottom: "2rem",
          textAlign: "left",
          fontSize: "1.5rem",
          fontWeight: "bold",
          fontStyle:"italic",
        }}
      >
        Sri's Lenovo Store
      </div>

      {/* Main flex container */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Left: Image carousel */}
        <div
          style={{
            flex: "1 1 540px",
            height: "600px",
            width:"500px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "left",
            flexDirection: "column",
            marginLeft:"-16%"
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "450px" }}>
            <button
              onClick={handlePrev}
              aria-label="Previous Image"
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "#fff",
                padding: "0.5rem",
                borderRadius: "50%",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <FaArrowLeft size={24} />
            </button>

            <img
              src={product.images?.[selectedIndex] || ""}
              alt={product.name}
              style={{
                marginTop:"0%",
                maxWidth: "80%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            />

            <button
              onClick={handleNext}
              aria-label="Next Image"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "#fff",
                padding: "0.5rem",
                borderRadius: "50%",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <FaArrowRight size={24} />
            </button>
          </div>

          {/* Thumbnails */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "1rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {product.images?.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                style={{
                  height: "80px",
                  width: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border:
                    selectedIndex === index
                      ? "2px solid #007bff"
                      : "2px solid #ccc",
                  borderRadius: "6px",
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: "#f0f0f0",
                  flexShrink: 0,
                }}
              >
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Product info */}
        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
          <h2>{product.name}</h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <StarRating rating={product.rating || 0} />
            <span>
              ({product.reviewsCount || (product.reviews?.length || 0)} reviews)
            </span>
          </div>

          <p>
            <strong>Original Price:</strong>{" "}
            <strike>{product.originalPrice || "N/A"}</strike>{" "}
            <span style={{ color: "red" }}>↓ 20%</span>
          </p>
          <p>
            <strong>Discount Price:</strong> {product.price || "N/A"}
          </p>

          <h4>Features</h4>
          <ul>
            {product.features?.length > 0 ? (
              product.features.map((f, i) => <li key={i}>{f}</li>)
            ) : (
              <li>No features listed.</li>
            )}
          </ul>

          <h4>Description</h4>
          <p>{product.description || "No description available."}</p>

          <button
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              backgroundColor: "#28a745",
              color: "#fff",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Admin Buttons: Update & Delete */}
          {isAdmin && (
            <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
              <button
                style={{
                  padding: "0.75rem 2rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/update", { state: { laptop: product } })}
              >
                Update
              </button>

              <button
                style={{
                  padding: "0.75rem 2rem",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}

          <div style={{ marginTop: "1rem" }}>
            <button
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "black",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/home")}
            >
              Home
            </button>
          </div>

          {/* Reviews */}
          <div style={{ marginTop: "1rem" }}>
            <h4>Customer Reviews</h4>
            {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
              product.reviews.map((review, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "1rem",
                  }}
                >
                  <p>
                    <strong>{review.user || "Anonymous"}</strong>
                  </p>
                  <StarRating rating={review.rating || 0} />
                  <p>{review.comment || "No comment."}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
