import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Accomodation from "./pages/Accomodation";
import Advertisement from "./pages/Advertisement";
import Register from "./pages/Register";
import EventRegister from "./pages/EventRegister";
import Footer from "./components/Footer/Footer";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
import Contact from "./components/Contact/Contact";
import Notfound from "./pages/Notfound";
import CallForPapers from "./pages/CallForPapers";
import OrderOfProgram from "./pages/Order-Of-Program";
import Submission from "./pages/Submission";

const ScrollToTop = ({ scrollRef }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, scrollRef]);
  return null;
};

const App = () => {
  const scrollRef = useRef(null);
  // const [loading, setLoading] = useState(true);
  // const spinner = document.getElementById("spinner");
  // if (spinner) {
  //   setTimeout(() => {
  //     spinner.style.display = "none";
  //     setLoading(false);
  //   }, 1000);
  // }

  return (
    // !loading && (
    <div className="scrollContainer" ref={scrollRef}>
      <ScrollToTop scrollRef={scrollRef} />
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Help />} path="/submit-abstract" />
        <Route element={<CallForPapers />} path="/call-for-papers" />
        <Route element={<CallForPapers />} path="/submit-guidelines" />
        <Route
          element={<CallForPapers />}
          path="/publication-of-conference-papers"
        />
        <Route element={<CallForPapers />} path="/presentation-guideline" />
        <Route element={<OrderOfProgram />} path="/programme" />
        <Route element={<OrderOfProgram />} path="/registration-guideline" />
        <Route element={<OrderOfProgram />} path="/committee" />
        <Route element={<Advertisement />} path="/advertisement" />
        <Route element={<Advertisement />} path="/exhibition" />
        <Route element={<Submission />} path="/submission" />
        <Route element={<Accomodation />} path="/accomodation" />
        {/* <Route element={<AboutUs />} path="/about-us" /> */}
        {/* <Route element={<Login />} path="/login" /> */}
        <Route element={<Register />} path="/register" />
        <Route element={<EventRegister />} path="/event" />
        <Route element={<Faq />} path="/faq" />
        <Route element={<Blog />} path="/blog" />
        <Route element={<Contact />} path="/contact-us" />

        <Route element={<Notfound />} path="*" />
      </Routes>
      <Footer />
    </div>
  );
  // );
};

export default App;
