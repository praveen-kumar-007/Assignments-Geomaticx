function AboutSection() {
  return (
    <div id="about" className="about">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="titlepage">
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
  );
}

export default AboutSection;
