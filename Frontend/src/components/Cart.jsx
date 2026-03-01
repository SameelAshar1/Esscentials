import React from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { formatPriceInPKR } from "../utils/currency";

const WHATSAPP_PHONE_NUMBER = "923080971904"; // Replace with your WhatsApp number (without +)

function Cart() {
  const {
    items,
    total,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const hasItems = items.length > 0;

  const handleCheckoutWhatsApp = () => {
    if (!hasItems) return;

    const lines = [];
    lines.push("Esscentials Order");
    lines.push("");

    items.forEach((item, index) => {
      const lineTotal = (Number(item.price) || 0) * (item.quantity || 0);
      lines.push(
        `${index + 1}. ${item.name} x ${item.quantity} = ${formatPriceInPKR(
          lineTotal,
        )}`,
      );
    });

    lines.push("");
    lines.push(`Total: ${formatPriceInPKR(total)}`);

    const message = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;

    window.location.href = url;
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>

        {!hasItems && (
          <p className="cart-empty">
            Your cart is empty. Add something lovely ✨
          </p>
        )}

        {hasItems && (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-main">
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">
                        {formatPriceInPKR(item.price)} each
                      </p>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <div className="line-total">
                      {formatPriceInPKR(
                        (Number(item.price) || 0) * (item.quantity || 0),
                      )}
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Total</span>
                <strong>{formatPriceInPKR(total)}</strong>
              </div>
              <div className="cart-summary-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCheckoutWhatsApp}
                  disabled={!hasItems}
                >
                  Checkout via WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
