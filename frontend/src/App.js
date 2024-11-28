import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Accomodation from "./pages/Accomodation";
import Committee from "./pages/Committee";
import Advertisement from "./pages/Advertisement";
// import AboutUs from "./pages/About-Us";
// import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer/Footer";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
import Contact from "./components/Contact/Contact";
import Notfound from "./pages/Notfound";
import SubmissionGuidlines from "./pages/SubmissionGuidlines";
import PresentationGuidline from "./pages/PresentationGuideline";
import POCP from "./pages/POCP";
import OrderOfProgram from "./pages/Order-Of-Program";
import Exhibition from "./pages/Exhibition";
import RegistrationGuide from "./pages/RegistrationGuide";
import Submission from "./pages/Submission";

const App = () => {
  const location = useLocation();
  const [navVisibility, setNavVisibility] = useState(false);

  useEffect(() => {
    if (navVisibility) setNavVisibility(false);
  }, [location]);

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
    <div className="scrollContainer">
      <Navbar
        navVisibility={navVisibility}
        setNavVisibility={setNavVisibility}
      />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Help />} path="/submit-abstract" />
        <Route element={<SubmissionGuidlines />} path="/submit-guidelines" />
        <Route element={<POCP />} path="/publication-of-conference-papers" />
        <Route element={<OrderOfProgram />} path="/programme" />
        <Route element={<Exhibition />} path="/exhibition" />
        <Route element={<RegistrationGuide />} path="/registration-guideline" />
        <Route
          element={<PresentationGuidline />}
          path="/presentation-guideline"
        />
        <Route element={<Submission />} path="/submission" />
        <Route element={<Accomodation />} path="/accomodation" />
        <Route element={<Advertisement />} path="/advertisement" />
        <Route element={<Committee />} path="/committee" />
        {/* <Route element={<AboutUs />} path="/about-us" /> */}
        {/* <Route element={<Login />} path="/login" /> */}
        <Route element={<Register />} path="/register" />
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
