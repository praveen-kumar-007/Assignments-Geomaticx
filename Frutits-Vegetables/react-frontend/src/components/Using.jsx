import React from "react";

function Using() {
  return (
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
  );
}

export default Using;
