import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    this.sectionRef = React.createRef();
  }

  componentDidMount() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (this.sectionRef.current) {
      observer.observe(this.sectionRef.current);
    }
  }

  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <section className="section about" id="about" ref={this.sectionRef}>
        <div className="section-container">
          <div className="about__grid">
            <div className="about__photo-container reveal">
              <img
                className="about__photo"
                src={`images/${data.image}`}
                alt={`${data.name}`}
              />
              <div className="about__photo-glow" />
            </div>

            <div className="about__text">
              <h2 className="reveal reveal-delay-1">About Me</h2>
              <p className="about__bio reveal reveal-delay-2">{data.bio}</p>

              <div className="about__details reveal reveal-delay-3">
                <div className="about__detail">
                  <div className="about__detail-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="about__detail-text">
                    <div className="about__detail-label">Location</div>
                    <div className="about__detail-value">{data.location}</div>
                  </div>
                </div>

                <div className="about__detail">
                  <div className="about__detail-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                    </svg>
                  </div>
                  <div className="about__detail-text">
                    <div className="about__detail-label">Role</div>
                    <div className="about__detail-value">
                      {data.title} @ {data.company}
                    </div>
                  </div>
                </div>

                <div className="about__detail">
                  <div className="about__detail-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="about__detail-text">
                    <div className="about__detail-label">Email</div>
                    <div className="about__detail-value">
                      <a href={`mailto:${data.email}`}>{data.email}</a>
                    </div>
                  </div>
                </div>

                <div className="about__detail">
                  <div className="about__detail-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2L2 22h20L12 2zm0 4.13L18.94 19H5.06L12 6.13z"/>
                    </svg>
                  </div>
                  <div className="about__detail-text">
                    <div className="about__detail-label">Exploration</div>
                    <div className="about__detail-value">47.3769° N · 8.5417° E · 408m</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
