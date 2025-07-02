import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    OriginalPrice: "",
    Ratings: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    console.log("Sending data:", product);
    axios
      .post("http://localhost:8080/api/laptops", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Product added successfully");
        navigate("/home");
        setProduct({
          name: "",
          description: "",
          price: "",
          OriginalPrice: "",
          Ratings: "",
          stockQuantity: "",
          releaseDate: "",
          productAvailable: false,
        });
        setImage(null);
        setPreviewUrl(null);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              id="description"
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="price" className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              id="price"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="OriginalPrice" className="form-label">
              <h6>Original Price</h6>
            </label>
            <input
              type="number"
              id="OriginalPrice"
              className="form-control"
              name="OriginalPrice"
              value={product.OriginalPrice}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="Ratings" className="form-label">
              <h6>Ratings</h6>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              id="Ratings"
              className="form-control"
              name="Ratings"
              value={product.Ratings}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="stockQuantity" className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              id="stockQuantity"
              className="form-control"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="releaseDate" className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              id="releaseDate"
              className="form-control"
              name="releaseDate"
              value={product.releaseDate}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="imageFile" className="form-label">
              <h6>Image</h6>
            </label>
            <input
              type="file"
              id="imageFile"
              className="form-control"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "10px" }}
              />
            )}
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="productAvailable"
                name="productAvailable"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct({ ...product, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label" htmlFor="productAvailable">
                Product Available
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
