import React, { Component } from "react";

class Portfolio extends Component {
  render() {
    if (this.props.data) {
      var projects = this.props.data.projects.map(function (projects) {
        var projectImage = "images/portfolio/" + projects.image;
        return (
          <section className="about">
            <div className="row">
              <div className="three columns proj-image">
                <a href={projects.url} title={projects.title}>
                  <img src={projectImage} alt={projects.title} />
                </a>
              </div>
              <div className="nine columns main-col proj-content">
                <a href={projects.url} title={projects.title}>
                  <h2 className="proj-title">{projects.title}</h2>
                </a>
                <p style={{ fontSize: "1.75rem" }}>{projects.category}</p>
              </div>
            </div>
            <br />
          </section>
        );
      });
    }

    return (
      <section id="portfolio">
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Check out some of my interesting projects</h1>

            <div>{projects}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
