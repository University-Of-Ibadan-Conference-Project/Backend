import App from "./App";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Advertisement from "./pages/Advertisement";
import Register from "./pages/Register";
import EventRegister from "./pages/EventRegister";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
import Contact from "./components/Contact/Contact";
import Notfound from "./pages/Notfound";
import CallForPapers from "./pages/CallForPapers";
import OrderOfProgram from "./pages/Order-Of-Program";
import Submission from "./pages/Submission";
import Committees from "./pages/Committees";

export const routes = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "submit-abstract", Component: Help },
      { path: "call-for-papers", Component: CallForPapers },
      { path: "submit-guidelines", Component: CallForPapers },
      { path: "publication-of-conference-papers", Component: CallForPapers },
      { path: "presentation-guideline", Component: CallForPapers },
      { path: "programme", Component: OrderOfProgram },
      { path: "registration-guideline", Component: OrderOfProgram },
      { path: "committees", Component: Committees },
      { path: "committee", Component: OrderOfProgram },
      { path: "advertisement", Component: Advertisement },
      { path: "exhibition", Component: Advertisement },
      { path: "submission", Component: Submission },
      { path: "register", Component: Register },
      { path: "event", Component: EventRegister },
      { path: "faq", Component: Faq },
      { path: "blog", Component: Blog },
      { path: "contact-us", Component: Contact },
      { path: "*", Component: Notfound },
    ],
  },
];
