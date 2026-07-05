import React, { Component } from "react";

class Skills extends Component {
  componentDidMount() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".skills__category.reveal").forEach((el) => {
      observer.observe(el);
    });
  }

  render() {
    const { data } = this.props;
    if (!data) return null;

    const categories = [
      { key: "languages", title: "Languages" },
      { key: "infrastructure", title: "Infrastructure" },
      { key: "domains", title: "Domains" }
    ];

    return (
      <section className="section skills" id="skills">
        <div className="section-container">
          <h2 className="section-title">Skills & Tools</h2>

          <div className="skills__grid">
            {categories.map((cat, index) => (
              <div
                className={`skills__category reveal reveal-delay-${index + 1}`}
                key={cat.key}
              >
                <h3 className="skills__category-title">{cat.title}</h3>
                <div className="skills__list">
                  {data[cat.key] &&
                    data[cat.key].map((skill, sIndex) => (
                      <span className="skills__item" key={sIndex}>
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;
