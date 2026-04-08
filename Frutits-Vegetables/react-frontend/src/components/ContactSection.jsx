import React from "react";

function ContactSection({ showTitle = true }) {
  return (
    <div className="contact-page">
      <div className="contact">
        <div className="container">
          {showTitle && (
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>Contact Us</h2>
                </div>
              </div>
            </div>
          )}
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
  );
}

export default ContactSection;
