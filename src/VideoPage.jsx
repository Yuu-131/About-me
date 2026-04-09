import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoPage({ src, title = "SIDE PROJECTS" }) {
  const navigate = useNavigate();
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === "ArrowLeft" ||
        e.key === "Escape" ||
        e.key === "Backspace"
      ) {
        e.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setVideoFailed(true)}
      />

      <style>{`
        .video-page-overlay {
          position: absolute;
          inset: 0;
          z-index: 12;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(5, 10, 22, 0.62), rgba(8, 16, 34, 0.35));
        }

        .video-page-title {
          position: absolute;
          top: 8vh;
          left: 4vw;
          font-family: 'Anton', sans-serif;
          font-size: clamp(48px, 8vw, 120px);
          letter-spacing: 2px;
          color: #f4fbff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
        }

        .video-page-subtitle {
          position: absolute;
          top: calc(8vh + clamp(54px, 8.5vw, 126px));
          left: 4.2vw;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(16px, 1.9vw, 28px);
          letter-spacing: 2px;
          color: rgba(219, 239, 255, 0.92);
        }

        .video-page-hint {
          position: absolute;
          right: 2vw;
          bottom: 3vh;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(14px, 1.5vw, 22px);
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(255, 255, 255, 0.32);
          padding: 8px 12px;
          border-radius: 4px;
          pointer-events: all;
          cursor: pointer;
          background: rgba(8, 12, 24, 0.34);
          transition: background 0.2s ease;
        }
        .video-page-hint:hover {
          background: rgba(14, 20, 36, 0.62);
        }

        .video-page-fallback {
          position: absolute;
          left: 4vw;
          bottom: 9vh;
          max-width: min(86vw, 760px);
          padding: 14px 18px;
          background: rgba(0, 0, 0, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.24);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(16px, 1.8vw, 26px);
          letter-spacing: 0.4px;
          color: #f2f7ff;
        }
      `}</style>

      <div className="video-page-overlay" aria-hidden="true">
        <div className="video-page-title">{title}</div>
        <div className="video-page-subtitle">showcase under construction</div>
      </div>

      {videoFailed && (
        <div className="video-page-fallback">
          The background clip could not load in this browser, but the page is
          active.
        </div>
      )}

      <button
        className="video-page-hint"
        type="button"
        onClick={() => navigate(-1)}
      >
        ESC / BACKSPACE / LEFT ARROW : BACK
      </button>
    </div>
  );
}
