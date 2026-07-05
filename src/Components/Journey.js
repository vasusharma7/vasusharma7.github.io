import React, { Component } from "react";

class Journey extends Component {
  componentDidMount() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".timeline__item .reveal").forEach((el) => {
      observer.observe(el);
    });
  }

  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <section className="section journey" id="journey">
        <div className="section-container">
          <h2 className="section-title">The Journey</h2>

          <div className="timeline">
            {data.map((item, index) => (
              <div className="timeline__item" key={index}>
                <div className="timeline__dot" />
                <div className={`timeline__card reveal reveal-delay-${(index % 4) + 1}`}>
                  <div className="timeline__card-header-decor">
                    <span className="decor-dot"></span>
                    <span className="decor-dot"></span>
                    <span className="decor-dot"></span>
                    <span className="decor-index">SYS_LOG_0{index + 1}</span>
                  </div>
                  <div className="timeline__header">
                    <div>
                      <h3 className="timeline__company">{item.company}</h3>
                      <p className="timeline__title">{item.title}</p>
                      {item.location && (
                        <p className="timeline__location">
                          <svg viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                          {item.location}
                        </p>
                      )}
                    </div>
                    <span className="timeline__period">{item.period}</span>
                  </div>

                  <div className="timeline__highlights">
                    {item.highlights.map((highlight, hIndex) => (
                      <p className="timeline__highlight" key={hIndex}>
                        {highlight}
                      </p>
                    ))}
                  </div>

                  <div className="timeline__tags">
                    {item.tags.map((tag, tIndex) => (
                      <span className="timeline__tag" key={tIndex}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Journey;
