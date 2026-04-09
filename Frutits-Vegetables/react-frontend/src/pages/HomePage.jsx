import React from "react";
import { products, galleryImages } from "../data/siteData";

function HomePage() {
  return (
    <>
      <section className="banner_main">
        <div className="container">
          <div className="banner_po">
            <div className="row">
              <div className="col-md-7">
                <div className="text_box">
                  <span>Now started</span>
                  <h1>
                    <strong>Fruit And </strong>
                    <br />
                    Vegetables
                  </h1>
                  <a className="read_more" href="#about" role="button">
                    About us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="about" className="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="titlepage">
                <h2>About Us</h2>
                <span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptu
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="about_img">
                <figure>
                  <img src="/images/about.png" alt="About" />
                </figure>
                <a className="read_more" href="/about">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="products">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="titlepage">
                <h2>Our Products</h2>
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
              <div key={item.title} className="col-lg-3 col-md-6 col-sm-6">
                <div id="ho_bo" className="our_products">
                  <div className="product">
                    <figure>
                      <img src={item.image} alt={item.title} />
                    </figure>
                  </div>
                  <h3>{item.title}</h3>
                  <span>Nam libero tempore</span>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="using">
        <div className="container-fluid">
          <div className="row d_flex">
            <div className="col-md-6">
              <div className="titlepage">
                <h2>Lorem Ipsum using</h2>
                <p>
                  Nor again is there anyone who loves or pursues or desires to
                  obtain pain of itself, because it is pain, but because
                  occasionally circumstances occur in which toil and pain can
                  procure him some great pleasure. To take a trivial example,
                  which of us ever undertakes laborious physical exercise
                </p>
                <a className="read_more white_bg" href="/about">
                  Read More
                </a>
              </div>
            </div>
            <div className="col-md-5 offset-md-1 padding_right0">
              <div className="frout_img">
                <figure>
                  <img src="/images/frout.png" alt="Fruit" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gallery">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Gallery</h2>
                <span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            {galleryImages.map((image, index) => (
              <div key={image} className="col-md-4 col-sm-6">
                <div className="gallery_img">
                  <figure>
                    <img src={image} alt={`Gallery ${index + 1}`} />
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-page">
        <div className="contact">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>Contact Us</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 padding_right0">
                <div className="map_main">
                  <div className="map-responsive">
                    <iframe
                      title="location-map"
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
                      width="600"
                      height="453"
                      frameBorder="0"
                      style={{ border: 0, width: "100%" }}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 padding_left0">
                <form
                  className="main_form"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        className="contactus"
                        placeholder="Name"
                        type="text"
                        name="Name"
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        className="contactus"
                        placeholder="Phone"
                        type="text"
                        name="Phone"
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        className="contactus"
                        placeholder="Email"
                        type="email"
                        name="Email"
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="textarea"
                        placeholder="Message"
                        name="Message"
                      />
                    </div>
                    <div className="col-md-12">
                      <button className="send_btn" type="submit">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
