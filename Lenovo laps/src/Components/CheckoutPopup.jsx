import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  const [step, setStep] = useState("form");
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep("confirmed");
    handleCheckout();
  };

  const handleModalClose = () => {
    setStep("form");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{step === "form" ? "Checkout" : "Order Confirmed"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {step === "form" ? (
          <>
            <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "1rem" }}>
              {Array.isArray(cartItems) && cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map((item) => {
                  const priceNum = parseFloat(
                    item.price?.toString().replace(/[^0-9.-]+/g, "") || "0"
                  );
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "10px",
                      }}
                    >
                      <img
                        src={item.images?.[0] || item.imageUrl || ""}
                        alt={item.name}
                        style={{ width: 60, height: 50, objectFit: "contain", marginRight: "1rem" }}
                      />
                      <div style={{ flex: 1 }}>
                        <b>{item.name}</b>
                        <div>Qty: {item.quantity}</div>
                        <div>Price: Rs {priceNum * item.quantity}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <h5>Total: Rs {totalPrice}</h5>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={customerData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter your address"
                  name="address"
                  value={customerData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ width: "100%" }}>
                Place Order
              </Button>
            </Form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <h4>Your order is confirmed!</h4>
            <p>Thank you for shopping with us.</p>
            <Button variant="success" onClick={handleModalClose}>
              Close
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutPopup;
