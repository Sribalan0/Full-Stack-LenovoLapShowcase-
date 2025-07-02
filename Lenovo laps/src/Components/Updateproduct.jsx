import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      alert("No product ID provided. Redirecting to home.");
      navigate("/home");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );

        const product = response.data;

        setUpdateProduct({
          name: product.name || "",
          description: product.description || "",
          brand: product.brand || "",
          price: product.price || "",
          category: product.category || "",
          releaseDate: product.releaseDate || "",
          productAvailable: product.productAvailable || false,
          stockQuantity: product.stockQuantity || "",
          imageUrl: product.imageUrl || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product data.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setUpdateProduct((prev) => ({ ...prev, imageUrl: "" })); // Clear preview URL if new image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "product",
        new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
      );

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await axios.put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product. Please try again.");
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: "3rem auto" }}>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={updateProduct.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={updateProduct.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            value={updateProduct.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={updateProduct.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={updateProduct.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="laptop">Laptop</option>
            <option value="headphone">Headphone</option>
            <option value="mobile">Mobile</option>
            <option value="electronics">Electronics</option>
            <option value="toys">Toys</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            className="form-control"
            value={
              updateProduct.releaseDate
                ? updateProduct.releaseDate.split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            className="form-control"
            value={updateProduct.stockQuantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="col-12 form-check">
          <input
            type="checkbox"
            name="productAvailable"
            className="form-check-input"
            id="productAvailable"
            checked={updateProduct.productAvailable}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="productAvailable">
            Product Available
          </label>
        </div>

        <div className="col-12">
          <label className="form-label">Product Image</label>
          <div style={{ marginBottom: "10px" }}>
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded preview"
                style={{ width: "100%", maxHeight: 200, objectFit: "contain" }}
              />
            ) : updateProduct.imageUrl ? (
              <img
                src={updateProduct.imageUrl}
                alt="Existing product"
                style={{ width: "100%", maxHeight: 200, objectFit: "contain" }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
