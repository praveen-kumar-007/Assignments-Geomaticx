import { galleryImages } from "../data/siteData";

import React from "react";

function Gallery({ showTitle = true }) {
  return (
    <div className="gallery">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              {showTitle && <h2>Gallery</h2>}
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
  );
}

export default Gallery;
