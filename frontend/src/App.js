import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const ScrollToTop = ({ scrollRef }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, scrollRef]);
  return null;
};

const App = () => {
  const scrollRef = useRef(null);

  return (
    <div className="scrollContainer" ref={scrollRef}>
      <ScrollToTop scrollRef={scrollRef} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
