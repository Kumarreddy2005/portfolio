import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Capabilities from "./components/Capabilities";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Learning from "./components/Learning";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Capabilities />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
