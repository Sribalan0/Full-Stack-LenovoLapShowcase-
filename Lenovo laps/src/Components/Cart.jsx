import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import CheckoutPopup from "./CheckoutPopup";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  const parsePrice = (price) => {
    if (!price) return 0;
    return Number(price.toString().replace(/[^0-9.-]+/g, "")) || 0;
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + parsePrice(item.price) * Number(item.quantity),
    0
  );

  const handleCheckoutConfirm = () => {
    alert("Purchase Confirmed! Thank you.");
    setShowCheckout(false);
    clearCart();
    navigate("/home");
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Shopping Bag
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h4>Your cart is empty</h4>
        </div>
      ) : (
        <>
          <ul style={{ padding: 0, margin: 0 }}>
            {cart.map((item) => {
              const cleanPrice = parsePrice(item.price);
              return (
                <li
                  key={item.id}
                  style={{ listStyle: "none", marginBottom: "1rem" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.images?.[0] || item.imageUrl || ""}
                      alt={item.name}
                      style={{
                        width: 100,
                        height: 80,
                        objectFit: "contain",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/product/${item.id}`, { state: { laptop: item } })}
                    />

                    <div style={{ marginLeft: "1rem", flex: 1 }}>
                      <div style={{ fontWeight: "bold" }}>{item.brand || "Brand"}</div>
                      <div>{item.name}</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, +1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        style={{ marginRight: "0.3rem" }}
                      >
                        +
                      </Button>
                      <input
                        type="button"
                        value={item.quantity}
                        readOnly
                        style={{ width: "30px", textAlign: "center" }}
                      />
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        style={{ marginLeft: "0.3rem" }}
                      >
                        -
                      </Button>
                    </div>

                    <div style={{ textAlign: "center", marginLeft: "1rem", minWidth: "80px" }}>
                      Rs {cleanPrice * Number(item.quantity)}
                    </div>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      style={{ marginLeft: "1rem" }}
                    >
                      x
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.25rem", textAlign: "right" }}>
            Total: Rs {totalPrice}
          </div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Button variant="danger" onClick={() => setShowCheckout(true)}>
              Checkout
            </Button>

            <Button
              variant="success"
              onClick={() => navigate("/home")}
            >
              Home
            </Button>

            <Button variant="danger" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </>
      )}

      <CheckoutPopup
        show={showCheckout}
        handleClose={() => setShowCheckout(false)}
        cartItems={cart}
        totalPrice={totalPrice}
        handleCheckout={handleCheckoutConfirm}
      />
    </div>
  );
};

export default Cart;
