import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import CaseStudyDetail from "./pages/CaseStudyDetail.jsx";
import Skills from "./pages/Skills.jsx";
import CV from "./pages/CV.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const location = useLocation();

  return (
    <div className="frame">
      <ScrollToTop />
      <Nav />
      {/* Keying on pathname replays the fade for every navigation */}
      <main className="app-main" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/cv" element={<CV />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
