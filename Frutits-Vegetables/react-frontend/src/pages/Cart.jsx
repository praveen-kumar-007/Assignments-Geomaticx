import React, { useEffect, useState } from "react";
import PageBanner from "../components/PageBanner";
import { clearCart, getCart } from "../utils/cartUtils";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleClearCart = () => {
    setCartItems(clearCart());
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <PageBanner title="Cart" />
      <div className="cart-page">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="row">
              <div className="col-md-12">
                <p>Your cart is empty.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="row">
                <div className="col-md-12">
                  <button className="send_btn" type="button" onClick={handleClearCart}>
                    Clear Cart
                  </button>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                    <div className="our_products">
                      <div className="product">
                        <figure>
                          <img src={item.image} alt={item.title} />
                        </figure>
                      </div>
                      <h3>{item.title}</h3>
                      <p>Price: ₹{item.price.toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row" style={{ marginTop: "30px" }}>
                <div className="col-md-12">
                  <div className="our_products">
                    <h3>Total Amount</h3>
                    <p>₹{totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
