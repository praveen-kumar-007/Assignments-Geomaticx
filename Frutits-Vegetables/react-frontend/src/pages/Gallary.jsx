import React from "react";
import { galleryImages } from "../data/siteData";
import PageBanner from "../components/PageBanner";

function Gallary() {
  return (
    <>
      <PageBanner title="Gallery" />
      <div className="gallery">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
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
    </>
  );
}

export default Gallary;
