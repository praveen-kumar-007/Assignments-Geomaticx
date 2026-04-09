import React, { useState } from "react";
import PageBanner from "../components/PageBanner";

function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;

    if (name === "Phone") {
      newValue = value.replace(/\D/g, "");
      if (newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (formData.Name.trim() === "") {
      newErrors.Name = "Please enter your name.";
    }

    if (formData.Phone.trim() === "") {
      newErrors.Phone = "Please enter your phone number.";
    } else if (isNaN(formData.Phone) || formData.Phone.length !== 10) {
      newErrors.Phone = "Phone number should be 10 digits.";
    }

    if (formData.Email.trim() === "") {
      newErrors.Email = "Please enter your email.";
    } else if (!formData.Email.includes("@") || !formData.Email.includes(".")) {
      newErrors.Email = "Please enter a valid email.";
    }

    if (formData.Message.trim() === "") {
      newErrors.Message = "Please enter your message.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setErrors({});
    setSubmitMessage("");

    fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) {
          throw new Error(
            body.errors
              ? body.errors.join(" ")
              : body.message || "Submission failed",
          );
        }
        return body;
      })
      .then(() => {
        setSubmitMessage("Message submitted successfully!");
        setFormData({ Name: "", Phone: "", Email: "", Message: "" });
      })
      .catch((error) => {
        setSubmitMessage(error.message || "Unable to submit message.");
      });
  };

  return (
    <>
      <PageBanner title="Contact Us" />
      <div className="contact-page">
        <div className="contact">
          <div className="container">
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
                <form className="main_form" onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        className="contactus"
                        placeholder="Name"
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                      />
                      {errors.Name && (
                        <p style={{ color: "#dc3545", marginTop: "6px" }}>
                          {errors.Name}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <input
                        className="contactus"
                        placeholder="Phone"
                        type="tel"
                        name="Phone"
                        maxLength={10}
                        value={formData.Phone}
                        onChange={handleChange}
                      />
                      {errors.Phone && (
                        <p style={{ color: "#dc3545", marginTop: "6px" }}>
                          {errors.Phone}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <input
                        className="contactus"
                        placeholder="Email"
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                      />
                      {errors.Email && (
                        <p style={{ color: "#dc3545", marginTop: "6px" }}>
                          {errors.Email}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="textarea"
                        placeholder="Message"
                        name="Message"
                        value={formData.Message}
                        onChange={handleChange}
                      />
                      {errors.Message && (
                        <p style={{ color: "#dc3545", marginTop: "6px" }}>
                          {errors.Message}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <button className="send_btn" type="submit">
                        Send
                      </button>
                      {submitMessage && (
                        <p
                          style={{
                            color: submitMessage.includes("success")
                              ? "#198754"
                              : "#dc3545",
                            marginTop: "12px",
                          }}
                        >
                          {submitMessage}
                        </p>
                      )}
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

export default Contact;
