import React, { Component } from "react";

class Projects extends Component {
  componentDidMount() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".project-card.reveal").forEach((el) => {
      observer.observe(el);
    });
  }

  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <section className="section projects" id="projects">
        <div className="section-container">
          <h2 className="section-title">Things I've Built</h2>

          <div className="projects__grid">
            {data.map((project, index) => (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card reveal reveal-delay-${(index % 4) + 1}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <div className="project-card__window-header">
                  <span className="window-dot red"></span>
                  <span className="window-dot yellow"></span>
                  <span className="window-dot green"></span>
                  <span className="window-title">{project.title.toLowerCase()}.env</span>
                </div>

                <div className="project-card__image-container">
                  <img
                    className="project-card__image"
                    src={`images/portfolio/${project.image}`}
                    alt={project.title}
                  />
                  <div className="project-card__overlay" />
                </div>

                <div className="project-card__content">
                  <h3 className="project-card__title">
                    <span className="prompt">$&gt;</span> {project.title}
                  </h3>
                  <p className="project-card__description">
                    {project.description}
                  </p>

                  <div className="project-card__footer">
                    <div className="project-card__tags">
                      {project.tags.map((tag, tIndex) => (
                        <span className="project-card__tag" key={tIndex}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="project-card__link">
                      <svg viewBox="0 0 24 24">
                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Projects;
