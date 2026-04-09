import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import menuVideo from "./assets/Mainn.mp4";
import main1 from "./assets/main1.mp4";
import main2 from "./assets/main2.mp4";
import main3 from "./assets/main3.mp4";
import P3Menu from "./P3Menu";
import VideoPage from "./VideoPage";
import ResumePage from "./ResumePage";
import PageTransition from "./PageTransition";
import Socials from "./Socials";
import AboutMe from "./AboutMe";
import "./App.css";

const HEVC_SUPPORTED =
  typeof document !== "undefined" &&
  document.createElement("video").canPlayType('video/mp4; codecs="hev1"') !==
    "";

function MenuScreen() {
  const navigate = useNavigate();
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  );
}

function AnimatedRoutes({ resumeVideo, socialsVideo }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <MenuScreen />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition variant="about">
              <AboutMe />
            </PageTransition>
          }
        />
        <Route
          path="/resume"
          element={
            <PageTransition>
              <ResumePage src={resumeVideo} />
            </PageTransition>
          }
        />
        <Route
          path="/socials"
          element={
            <PageTransition variant="socials">
              <Socials src={socialsVideo} />
            </PageTransition>
          }
        />
        <Route
          path="/sideproj"
          element={
            <PageTransition>
              <VideoPage src={main1} />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const resumeVideo = HEVC_SUPPORTED ? main2 : main1;
  const socialsVideo = HEVC_SUPPORTED ? main3 : main1;

  return (
    <AnimatedRoutes resumeVideo={resumeVideo} socialsVideo={socialsVideo} />
  );
}
