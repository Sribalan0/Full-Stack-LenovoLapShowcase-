import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextCarousel from "./TextCarousel";
import {
  FaHome,
  FaTools,
  FaPhone,
  FaInfoCircle,
  FaShoppingCart,
  FaBox,
  FaSearch,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCartPlus,
  FaGithub
} from "react-icons/fa";

import axios from "axios";

import slimImage from "../assets/slim.avif";
import logoImage from "../assets/268.jpg";
import shoppingImage from "../assets/shopping.webp";
import laps from "../assets/71HMPbAf-iL._SX679_.jpg";
import Lap1 from "../assets/u2o87bi69godpx1qoh5z5fyjtmw1ir425939.avif";
import lap2 from "../assets/ixaziyb8ymxfigq8cxr8utqqh8kncx356712.avif";
import lap3 from "../assets/shopping (1).webp";
import lap4 from "../assets/shopping (2).webp";
import lap5 from "../assets/shopping (3).webp";
import lap6 from "../assets/shopping (4).webp";

// Static laptops data (unchanged)
const laptopsData = [
  {
    id: 1,
    name: "IdeaPad Slim 3i",
    price: "₹45,999",
    badge:"Students Choice",
    originalPrice: "₹52,999",
    rating: 4.2,
    releasedate: "04/03/2025",
    reviewsCount: 45,
    features: [
      "Intel Core i5 10th Gen Processor",
      "8GB DDR4 RAM",
      "512GB SSD Storage",
      "14-inch Full HD Display",
      "Windows 11 Home",
      "Slim and lightweight design",
      "Up to 7 hours battery life",
      "Rapid Charge",
      "WiFi 6 & Bluetooth 5.2",
    ],
    images: [slimImage, shoppingImage, lap2],
    description:
      "The IdeaPad Slim 3i is a versatile laptop built for productivity and portability.",
    reviews: [
      { user: "Aarav", rating: 5, comment: "Excellent performance and battery life." },
      { user: "Meera", rating: 4, comment: "Sleek design and very fast SSD." },
    ],
  },
  {
  id: 2,
  name: "ThinkPad X1",
  price: "₹1,55,000",
  originalPrice: "₹1,80,000",
  badge:"Gamers Choice",
  rating: 4.8,
  releasedate: "15/04/2025",
  reviewsCount: 120,
  features: [
    "Intel Core i7 12th Gen Processor",
    "16GB DDR5 RAM",
    "1TB SSD Storage",
    "14-inch UHD Display",
    "Windows 11 Pro",
    "Carbon fiber chassis",
    "Fingerprint reader",
    "Thunderbolt 4 ports",
    "WiFi 6E & Bluetooth 5.2",
  ],
  images: [Lap1, lap4, lap5],
  description: "Lightweight, durable, and powerful — perfect for professionals on the go.",
  reviews: [
    { user: "Sahana", rating: 5, comment: "Absolutely love the portability and speed." },
    { user: "Ravi", rating: 4, comment: "Great laptop but battery could be better." },
  ],
},
{
  id: 3,
  name: "Legion 5 ",
  price: "₹1,10,999",
  originalPrice: "₹1,29,999",
  badge:"Students Choice",
  rating: 4.5,
  releasedate: "01/05/2025",
  reviewsCount: 90,
  features: [
    "AMD Ryzen 7 5800H",
    "16GB DDR4 RAM",
    "512GB NVMe SSD",
    "16-inch QHD 165Hz Display",
    "Windows 11 Home",
    "NVIDIA RTX 3060 GPU",
    "RGB backlit keyboard",
    "Dolby Atmos",
    "WiFi 6 & Bluetooth 5.1",
  ],
  images: [laps, lap6, shoppingImage],
  description: "A beast for gaming and creative work with stunning display and performance.",
  reviews: [
    { user: "Aditya", rating: 5, comment: "Runs all games smoothly with high FPS." },
    { user: "Neha", rating: 4, comment: "Sleek design and good thermals." },
  ],
  
},
{
  id: 4,
  name: "IdeaPad Gaming ",
  price: "₹72,499",
  originalPrice: "₹82,999",
    badge:"Gamers Choice",
  rating: 4.3,
  releasedate: "22/04/2025",
  reviewsCount: 55,
  features: [
    "AMD Ryzen 5 5600H",
    "8GB DDR4 RAM",
    "512GB SSD Storage",
    "15.6-inch Full HD 120Hz Display",
    "Windows 11 Home",
    "NVIDIA GTX 1650 GPU",
    "Cooling system with dual fans",
    "Backlit keyboard",
    "WiFi 6 & Bluetooth 5.0",
  ],
  images: [lap4, lap5, lap6],
  description: "Affordable gaming laptop with solid specs for casual gamers.",
  reviews: [
    { user: "Harish", rating: 4, comment: "Good value for money and performance." },
    { user: "Divya", rating: 4, comment: "Runs games smoothly at medium settings." },
  ],

},
{
  id: 5,
  name: "IdeaPad 1 ",
  price: "₹82,499",
  originalPrice: "₹99,999",
    badge:"Gamers Choice",
  rating: 4.3,
  releasedate: "22/04/2025",
  reviewsCount: 55,
  features: [
    "AMD Ryzen 5 5600H",
    "8GB DDR4 RAM",
    "512GB SSD Storage",
    "15.6-inch Full HD 120Hz Display",
    "Windows 11 Home",
    "NVIDIA GTX 1650 GPU",
    "Cooling system with dual fans",
    "Backlit keyboard",
    "WiFi 6 & Bluetooth 5.0",
  ],
  images: [shoppingImage, lap5, lap6],
  description: "Affordable gaming laptop with solid specs for casual gamers.",
  reviews: [
    { user: "Harish", rating: 4, comment: "Good value for money and performance." },
    { user: "Divya", rating: 4, comment: "Runs games smoothly at medium settings." },
  ],
},


  // ... other laptops unchanged, omitted here for brevity
];

// Carousel items (unchanged)
const carouselItems = [
  {
    img: Lap1,
    name: "Lenovo ThinkPad X1",
    price: "₹1,55,000",
  },
  {
    img: lap2,
    name: "Lenovo Yoga Slim 7",
    price: "₹79,999",
  },
  {
    img: lap3,
    name: "Lenovo Yoga 9i",
    price: "₹1,79,999",
  },
  {
    img: lap4,
    name: "Lenovo ThinkBook 14s",
    price: "₹72,999",
  },
  {
    img: lap5,
    name: "Lenovo ThinkBook 14s",
    price: "₹72,999",
  },
  {
    img: lap6,
    name: "Lenovo ThinkBook 14s",
    price: "₹72,999",
  },

];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        marginTop:"-1%",
        position: "relative",
        width: "105%",
        height: "260px",
        margin: "0px  0",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        userSelect: "none",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {carouselItems.map((item, index) => (
        <div
          key={index}
          style={{
            position: index === current ? "relative" : "absolute",
            opacity: index === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: "40px",
            padding: "0 2rem",
            boxSizing: "border-box",
          }}
        >
          <img
            src={item.img}
            alt={item.name}
            style={{
              height: "220px",
              width: "400px",
              borderRadius: "14px",
              objectFit: "contain",
              flexShrink: 0,
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.7))",
            }}
            draggable={false}
          />

          <div style={{ maxWidth: "600px", textAlign: "left", color: "#ffdd57" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#fff" }}>
              {item.name}
            </h2>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const [laptops, setLaptops] = useState(laptopsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    // Inject card styles + animated border CSS once
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
.card {
  width: 270px;
  height: 450px;
  border-radius: 20px;
  cursor: pointer;
  perspective: 1000px;
  position: relative;

  /* Double layered backgrounds:
     1. Inner solid dark background
     2. Animated neon gradient border */
  background-image:
    linear-gradient(#121212, #121212), /* inner background */
    linear-gradient(270deg, #ff00cc, #00ffff, #ff00cc); /* neon pink & cyan */

  background-origin: border-box;
  background-clip: padding-box, border-box;
  border: 5px solid transparent;

  /* Animate the border gradient horizontally */
  animation: borderMove 3s linear infinite;

  /* Bright glowing neon effect */
  box-shadow:
    0 0 8px #ff00cc,
    0 0 15px #00ffff,
    0 0 20px #ff00cc,
    0 0 40px #00ffff;
}

@keyframes borderMove {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

/* Keep flip effect as you had */
.content {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(145deg, #343642, #212121);
  position: absolute;
  transition: 0.5s;
  transform-style: preserve-3d;
}

.card:hover .content {
  transform: rotateY(180deg);
}

/* Front and back same as before */

      .front,
      .back {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        color: white;
      }

      .front {
        padding: 20px 20px 30px 20px;
      }

      .front img {
        width: 100%;
        height: 150px;
        border-radius: 15px;
        object-fit: cover;
        margin-bottom: 10px;
        box-shadow: 0 0 6px #ff4f81;
      }

      .back {
        background: #272930;
        padding: 20px 25px;
        transform: rotateY(180deg);
        font-size: 0.8rem;
        font-weight: 600;
        overflow-y: auto;
        box-shadow: inset 0 0 6px #ff4f81;
      }

      .back h3 {
        font-weight: 700;
        font-size: 1rem;
        margin-bottom: 10px;
        color: #ff4f81;
      }

      .back ul {
        list-style: inside disc;
        color: #fff;
        margin-bottom: 15px;
      }

      .back ul li {
        margin-bottom: 5px;
      }

      .back p {
        font-weight: 700;
        color: #ff4f81;
      }

      /* Like button override inside card */
      .like-btn {
        position: absolute;
        top: 6px;
        right: 5px;
        background: white;
        border-radius: 50%;
        border: none;
        outline: none;
        font-size: 1.4rem;
        cursor: pointer;
        color: gray;
        padding: 4px;
        z-index: 2;
        transition: color 0.3s;
      }

      .like-btn.liked {
        color: red;
      }

      /* Buy Now button */
      .buy-btn {
        background-color: black;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        margin-top: auto;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/laptops")
      .then((response) => {
        const fetchedLaptops = response.data;
        const combined = [...laptopsData];
        fetchedLaptops.forEach((fetchedLaptop) => {
          const exists = combined.find((l) => l.id === fetchedLaptop.id);
          if (!exists) {
            combined.push(fetchedLaptop);
          }
        });
        setLaptops(combined);
      })
      .catch((error) => {
        console.error("Error fetching laptops:", error);
        setLaptops(laptopsData);
      });
  }, []);

  useEffect(() => {
    const filtered = laptops.filter((laptop) =>
      laptop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLaptops(filtered);
  }, [searchTerm, laptops]);

  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    setIsAdmin(adminFlag === "true");
  }, []);

  const toggleMenu = () => {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) navLinks.classList.toggle("show");
  };

  const goToProductPage = (laptop) => {
    navigate(`/product/${laptop.id}`, { state: { laptop } });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLike = (id) => {
    setLiked((prev) => {
      const newLiked = { ...prev, [id]: !prev[id] };
      if (newLiked[id]) alert("Added to liked");
      return newLiked;
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      contactNumber: e.target.contactNumber.value,
      message: e.target.message.value,
    };
    try {
      alert("Enquiry sent successfully! Our team will contact you soon.");
      e.target.reset();
    } catch (error) {
      console.error("Failed to send enquiry:", error);
      alert("Failed to send enquiry. Please try again later.");
    }
  };

  return (
    <div className="light_theme">
      {/* Navbar */}
      <div className="topnav-container">
        
        <div className="logo">
          <img src={logoImage} alt="Logo" />
          <span className="logo-text">Sri's</span>
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search laptops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <div className="topnav" id="navLinks">
          <Link to="/home">
            <FaHome /> Home
          </Link>
          <Link to="/services">
            <FaTools /> Services
          </Link>
          <a href="#contact" onClick={scrollToContact}>
            <FaPhone /> Contact
          </a>
          <Link to="/about">
            <FaInfoCircle /> About
          </Link>
          <Link to="/register">Register</Link>
<Link to="/login">Login</Link>
          <Link
            to="/cart"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <FaShoppingCart /> Cart
          </Link>

          {isAdmin && (
            <Link to="/addproduct">
              <FaCartPlus /> Add Product
            </Link>
          )}
        </div>
      </div>

      {/* Carousel */}
      <TextCarousel />
      <Carousel />

      {/* Main Content */}
      <div className="main-content" style={{ paddingTop: "60px" }}>
        {/* Laptop Cards */}
        <section className="products" id="laptop-list">
          <div
            className="product-list"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {filteredLaptops.length > 0 ? (
              filteredLaptops.map((laptop) => (
                <div
                  key={laptop.id}
                  className="card"
                  onClick={() => goToProductPage(laptop)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(laptop.id);
                    }}
                    className={`like-btn ${liked[laptop.id] ? "liked" : ""}`}
                    aria-label={liked[laptop.id] ? "Unlike" : "Like"}
                    title={liked[laptop.id] ? "Unlike" : "Like"}
                  >
                    {liked[laptop.id] ? "❤️" : "🤍"}
                  </button>

                  <div className="content">
                    <div className="front">
                      <img
                        src={
                          laptop.images && laptop.images.length > 0
                            ? laptop.images[0]
                            : "/path/to/placeholder.jpg"
                        }
                        alt={laptop.name}
                      />
                      <h3>{laptop.name}</h3>

                      <p style={{ margin: "5px 0", color: "#ff4f81", fontWeight: "bold" }}>
                        MRP: <strike>{laptop.originalPrice || "-"}</strike> <b>30% OFF</b>
                      </p>
                      <p style={{ fontWeight: "bold", color: "#00cc00" }}>
                        Incl. Shipping & all Taxes
                      </p>
<p>⭐⭐⭐⭐⭐</p>
                      <p style={{ fontWeight: "bold", color: "#fff", margin: "0px 0",marginTop:"0" }}>
                        {laptop.price || "-"} 
                      </p>
                      <div className="front">
  {laptop.badge && <div className="badge">{laptop.badge}</div>}
  <img src={laptop.images && laptop.images.length > 0 ? laptop.images[0] : "/path/to/placeholder.jpg"} alt={laptop.name} />
  <h3>{laptop.name}</h3>
  {/* rest of the content */}
  
   <button
                        className="buy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Added to Cart");
                        }}
                      >
                        Buy Now
                      </button>
                      
</div>

                    </div>

                    <div className="back">
                      <h3>Description</h3>
                      <p>{laptop.description || "No description available."}</p>

                      <h3>Features</h3>
                      <ul>
                        {laptop.features &&
                          laptop.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                      </ul>

                      <h3>Reviews</h3>
                      <ul>
                        {laptop.reviews &&
                          laptop.reviews.map((review, idx) => (
                            <li key={idx}>
                              <strong>{review.user}:</strong> {review.comment} ({review.rating}⭐)
                            </li>
                          ))}
                      </ul>

                     
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No laptops found matching your search.</p>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          style={{
            marginTop: "3rem",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
            background: "#f9f9f9",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Contact Info */}
          <div style={{ flex: "1 1 300px", minWidth: "280px" }} className="contact-details">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Reach out with any enquiries or feedback.</p>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                fontSize: "1rem",
                color: "#333",
              }}
            >
              <li>
                <FaMapMarkerAlt /> 123, Tech Street, Bangalore, India
              </li>
              <li>
                <FaPhoneAlt /> +91 98765 43210
              </li>
              <li>
                <FaEnvelope /> support@lenovosrilanka.com
              </li>
            </ul>
            <div className="social-links" style={{ marginTop: "1rem", fontSize: "1.3rem" }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ marginRight: "1rem" }}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                style={{ marginRight: "1rem" }}
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ marginRight: "1rem" }}
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ marginRight: "1rem" }}
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ marginRight: "1rem" }}
              >
                <FaYoutube />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ marginRight: "1rem" }}
              >
                <FaWhatsapp />
              </a>
              <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <form
            onSubmit={handleContactSubmit}
            style={{
              flex: "1 1 350px",
              minWidth: "280px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h2>Send an Enquiry</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number"
              pattern="[0-9]{10}"
              title="Enter 10 digit phone number"
              required
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Send Enquiry
            </button>
          </form>
        </section>

      </div>

      {/* Footer */}
  <>
  <style>{`
    footer a,
    footer a:visited {
      color: #ccc;
      text-decoration: none;
      margin: 0 10px;
      transition: color 0.3s ease, text-decoration 0.3s ease;
    }

    footer a:hover {
      color:blue;
      text-decoration: underline;
    }

    .contact-link {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s ease, text-decoration 0.3s ease;
    }
    .contact-link:hover {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
  `}</style>


<footer

  style={{

    backgroundColor: "#111",
    color: "#ccc",
    padding: "3rem 1rem",
    fontSize: "0.9rem",
    marginTop: "4rem",
  }}
>
 <div><h3 style={{color:"white",textAlign:"center",fontStyle:"italic"}}><u>About Us</u></h3></div>
  <div
    style={{
      display: "flex",
      flexWrap: "nowrap",        // NO wrapping, all in one row
      justifyContent: "space-between",
      gap: "2rem",
      textAlign: "left",
      maxWidth: "1200px",
      margin: "0 auto",
    }}
    
  >
    
    {/* Quick Links */}
    <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
      
      <h4 style={{ color: "#fff" }}>Quick Links</h4>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "0.5rem" }}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><a href="#contact">Contact</a></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </div>

    {/* Our Services */}
    <div style={{ flex: "1 1 180px", minWidth: "180px" }}>
      <h4 style={{ color: "#fff" }}>Our Services</h4>
      <ul style={{ listStyle: "disc", paddingLeft: "1rem", marginTop: "0.5rem", color: "#bbb" }}>
        <li>Laptop Sales & Discounts</li>
        <li>Bulk Orders</li>
        <li>Technical Consultation</li>
        <li>Warranty Support</li>
        <li>Student Offers</li>
        <li>Custom Builds</li>
      </ul>
    </div>

    {/* Customer Support */}
    <div style={{ flex: "1 1 220px", minWidth: "220px" }}>
      <h4 style={{ color: "#fff" }}><u></u>Customer Support</h4>
      <p style={{ marginTop: "0.5rem" }}>
        <a href="tel:+919876543210" className="contact-link">
          +91 98765 43210
        </a><br />
        <a href="mailto:support@lenovosrilanka.com" className="contact-link">
           support@lenovosrilanka.com
        </a><br />
        Mon–Sat: 9:00 AM – 6:00 PM
        24hrs Support
      </p>
      <p> </p>
    </div>

    {/* Our Location */}
    <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
      <h4 style={{ color: "#fff", marginBottom: "0.5rem" }}>📍 Our Location</h4>
      <iframe
        title="Store Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.1234567890!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167f5634e4e5%3A0x4a1b6f5a6f7f9ab3!2s123+Tech+Street%2C+Bengaluru%2C+Karnataka!5e0!3m2!1sen!2sin!4v1688123456789!5m2!1sen!2sin"
        width="300"
        height="100"
        style={{ border: 0, borderRadius: "8px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    {/* Social Media */}
    <div style={{ flex: "1 1 220px", minWidth: "220px" }}>
      <h4 style={{ color: "#fff" }}>Connect With Us</h4>
      <div style={{ fontSize: "1.5rem", marginTop: "0.5rem", display: "flex", gap: "0rem" }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
      </div>
    </div>
  </div>

  <hr style={{ borderTop: "1px solid #444", margin: "2rem 0" }} />

  {/* Bottom Note */}
  <div style={{ textAlign: "center", color: "#aaa" }}>
    <p>Secure payments • Trusted products • Free shipping included</p>
    <p>&copy; {new Date().getFullYear()} Sri's Lenovo Showcase. All rights reserved.</p>
  </div>
</footer>

</>


    </div>
  );
};

export default Home;
