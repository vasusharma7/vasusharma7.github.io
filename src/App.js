import React, { Component } from "react";
import ReactGA from "react-ga4";
import "./App.css";
import Nav from "./Components/Nav";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Journey from "./Components/Journey";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import Footer from "./Components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {},
      loaded: false,
    };

    ReactGA.initialize("G-C4VQM39R1F");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }

  componentDidMount() {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ resumeData: data, loaded: true });
      })
      .catch((err) => console.error("Failed to load resume data:", err));
  }

  render() {
    const { resumeData, loaded } = this.state;
    if (!loaded) return null;

    return (
      <div className="App">
        <Nav />
        <Hero data={resumeData.main} />
        <About data={resumeData.main} />
        <Journey data={resumeData.journey} />
        <Projects data={resumeData.projects} />
        <Skills data={resumeData.skills} />
        <Footer data={resumeData.main} />
      </div>
    );
  }
}

export default App;
