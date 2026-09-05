import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* Subtle grid background */}
      <div className="noise-bg" aria-hidden="true" />
      {/* Ambient accent glow */}
      <div className="ambient-gradient" aria-hidden="true" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
