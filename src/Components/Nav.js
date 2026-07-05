import React, { Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      mobileOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.setState({ scrolled: window.scrollY > 60 });
  };

  toggleMobile = () => {
    this.setState((prev) => ({ mobileOpen: !prev.mobileOpen }));
  };

  scrollTo = (id) => {
    this.setState({ mobileOpen: false });
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { scrolled, mobileOpen } = this.state;

    return (
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`} id="nav-top">
        <a
          href="#hero"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault();
            this.scrollTo("hero");
          }}
        >
          vs<span className="nav__logo-dot">.</span>
        </a>

        <button
          className="nav__mobile-toggle"
          onClick={this.toggleMobile}
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24">
            {mobileOpen ? (
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            ) : (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            )}
          </svg>
        </button>

        <div className={`nav__links ${mobileOpen ? "nav__links--open" : ""}`}>
          {["about", "journey", "projects", "skills"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="nav__link"
              onClick={(e) => {
                e.preventDefault();
                this.scrollTo(section);
              }}
            >
              {section}
            </a>
          ))}
        </div>
      </nav>
    );
  }
}

export default Nav;
