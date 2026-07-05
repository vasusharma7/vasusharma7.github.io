import React, { Component } from "react";

class Hero extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.stars = [];
    this.animationId = null;
  }

  componentDidMount() {
    this.initStarfield();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  handleResize = () => {
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  initStarfield = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create stars
    const numStars = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000));
    this.stars = [];
    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    this.shootingStars = [];
    this.lastShootingStar = 0;

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      this.stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * (0.5 + twinkle * 0.5);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 240, 235, ${alpha})`;
        ctx.fill();

        // Subtle glow for brighter stars
        if (star.size > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 165, 0, ${alpha * 0.08})`;
          ctx.fill();
        }

        // Slow drift
        star.y -= star.speed;
        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }
      });

      // Occasional shooting star
      if (time - this.lastShootingStar > 4000 + Math.random() * 8000) {
        this.shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4,
          length: 80 + Math.random() * 60,
          speed: 6 + Math.random() * 4,
          angle: (Math.PI / 6) + Math.random() * (Math.PI / 6),
          life: 1,
        });
        this.lastShootingStar = time;
      }

      // Draw shooting stars
      this.shootingStars = this.shootingStars.filter((ss) => {
        ss.life -= 0.015;
        if (ss.life <= 0) return false;

        const endX = ss.x + Math.cos(ss.angle) * ss.length;
        const endY = ss.y + Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
        gradient.addColorStop(0, `rgba(240, 165, 0, ${ss.life * 0.6})`);
        gradient.addColorStop(1, `rgba(240, 165, 0, 0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        return true;
      });

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  };

  scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <section className="hero" id="hero">
        <canvas className="hero__starfield" ref={this.canvasRef} />
        <div className="hero__topo-overlay" />

        <div className="hero__content">
          <p className="hero__greeting">{"// hello world"}</p>
          <h1 className="hero__name">{data.name}</h1>
          <h2 className="hero__tagline">
            <span className="hero__tagline-word">Wanderer</span>
            <span className="hero__tagline-separator">·</span>
            <span className="hero__tagline-word">Wonderer</span>
            <span className="hero__tagline-separator">·</span>
            <span className="hero__tagline-word">Coder</span>
          </h2>
          <p className="hero__subtitle">
            {data.title} @ {data.company} — {data.location}
            <span className="blink">_</span>
          </p>

          <div className="hero__social">
            {data.social.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="hero__social-link"
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
              >
                <SocialIcon name={link.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero__scroll">
          <button
            className="hero__scroll-indicator"
            onClick={this.scrollToAbout}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span>explore</span>
            <span className="hero__scroll-line" />
          </button>
        </div>
      </section>
    );
  }
}

function SocialIcon({ name }) {
  const icons = {
    github: (
      <svg viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.763-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.48 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.577C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    medium: (
      <svg viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default Hero;
