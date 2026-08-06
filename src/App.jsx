import { useEffect, useRef } from "react";
import SceneBackground from "./components/SceneBackground";
import CustomCursor from "./components/CustomCursor";
import MouseGlow from "./components/MouseGlow";
import ScrollProgress from "./components/ScrollProgress";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import "./App.css";

export default function App() {
  // Refs (not state) so scroll/mouse updates don't re-render React —
  // the Three.js scene reads these directly inside useFrame every tick.
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    const updateMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Loader />
      <ScrollProgress />
      <SceneBackground scrollRef={scrollRef} mouseRef={mouseRef} />
      <div className="grain" />
      <MouseGlow />
      <CustomCursor />

      <Nav />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Blog />
        <Contact />
      </main>

      <footer>built with react, three.js & coffee — © 2026 manish kumar</footer>
    </>
  );
}
