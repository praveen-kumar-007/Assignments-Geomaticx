import React from "react";
import { products } from "../data/siteData";
import PageBanner from "../components/PageBanner";
import { addToCart } from "../utils/cartUtils";

function Product() {
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <>
      <PageBanner title="Our Products" />
      <div className="products">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="titlepage">
                <span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptu
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            {products.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6 col-sm-6">
                <div id="ho_bo" className="our_products">
                  <div className="product">
                    <figure>
                      <img src={item.image} alt={item.title} />
                    </figure>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="product-price">₹{item.price.toFixed(2)}</p>
                  <span>Nam libero tempore</span>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non
                  </p>
                  <button
                    type="button"
                    className="send_btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
