import React from "react";
import ContactSection from "../components/ContactSection";
import PageBanner from "../components/PageBanner";

function Contact() {
  return (
    <>
      <PageBanner title="Contact Us" />
      <ContactSection showTitle={false} />
    </>
  );
}

export default Contact;
