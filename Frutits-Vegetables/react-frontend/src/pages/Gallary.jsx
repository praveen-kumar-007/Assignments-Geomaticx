import React from "react";
import PageBanner from "../components/PageBanner";
import Gallery from "../components/GallerySection";

function Gallary() {
  return (
    <>
      <PageBanner title="Gallery" />
      <Gallery showTitle={false} />
    </>
  );
}

export default Gallary;
