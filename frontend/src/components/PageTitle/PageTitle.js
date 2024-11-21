import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const { pathname } = useLocation();
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);
  let title = "Welcome";
  switch (currentPath) {
    case "/accomodation":
      title = "Accomodation";
      break;
    case "/committee":
      title = "Committee";
      break;
    case "/advertisement":
      title = "Advertisement";
      break;
    case "/about-us":
      title = "About Us";
      break;
    case "/help":
      title = "Help";
      break;

    default:
      title = "Welcome";
      break;
  }
  return (
    <div className="page-title">
      <h1>{title}</h1>
    </div>
  );
};

export default PageTitle;
