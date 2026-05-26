import React, { useState, useEffect, useRef } from "react";
import { desktopIcons, startMenuItems, windowsData } from "./data";

export default function App() {
  const [booting, setBooting] = useState(true);
  const [bootPct, setBootPct] = useState(0);
  const [bootHint, setBootHint] = useState("Loading resources...");
  const [openWindows, setOpenWindows] = useState([]); // array of window ids
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [topZ, setTopZ] = useState(200);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [time, setTime] = useState("");
  
  // Window positions state
  const [winPositions, setWinPositions] = useState({});

  useEffect(() => {
    // Clock
    const updateClock = () => {
      const now = new Date();
      setTime(
        String(now.getHours()).padStart(2, "0") +
          ":" +
          String(now.getMinutes()).padStart(2, "0")
      );
    };
    updateClock();
    const clockInt = setInterval(updateClock, 10000);

    // Boot sequence
    const hints = [
      "Loading resources...",
      "Initializing CJ's Picks...",
      "Mounting file system...",
      "Almost there...",
      "Welcome.",
    ];
    let bPct = 0;
    let hi = 0;
    const bootInt = setInterval(() => {
      bPct += Math.random() * 18 + 5;
      if (bPct > 100) bPct = 100;
      setBootPct(bPct);
      if (bPct > (hi + 1) * 20 && hi < hints.length - 1) {
        hi++;
        setBootHint(hints[hi]);
      }
      if (bPct >= 100) {
        clearInterval(bootInt);
        setTimeout(() => setBooting(false), 900); // fade out effect
      }
    }, 120);

    // Initial window load
    setTimeout(() => openWin("streaming"), 2200);

    return () => {
      clearInterval(clockInt);
      clearInterval(bootInt);
    };
  }, []);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#start-menu") && !e.target.closest("#start-btn")) {
        setStartOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openWin = (id) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
      if (!winPositions[id]) {
        setWinPositions(prev => ({
          ...prev, 
          [id]: { x: windowsData[id].defaultLeft, y: windowsData[id].defaultTop }
        }));
      }
    }
    setMinimizedWindows(minimizedWindows.filter((w) => w !== id));
    focusWin(id);
  };

  const closeWin = (id) => {
    setOpenWindows((w) => w.filter((win) => win !== id));
    if (focusedWindow === id) setFocusedWindow(null);
  };

  const toggleMinimize = (id) => {
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(minimizedWindows.filter((w) => w !== id));
      focusWin(id);
    } else {
      setMinimizedWindows([...minimizedWindows, id]);
      if (focusedWindow === id) setFocusedWindow(null);
    }
  };

  const focusWin = (id) => {
    setFocusedWindow(id);
    setTopZ((z) => z + 1);
  };

  // Dragging logic
  const dragRef = useRef(null);
  const handleDragStart = (e, id) => {
    if (window.innerWidth <= 600) return;
    focusWin(id);
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    dragRef.current = {
      id,
      ox: e.clientX - rect.left,
      oy: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragRef.current) return;
      const { id, ox, oy } = dragRef.current;
      let x = e.clientX - ox;
      let y = e.clientY - oy;
      const winEl = document.getElementById("win-" + id);
      if(winEl) {
          const maxX = window.innerWidth - winEl.offsetWidth;
          const maxY = window.innerHeight - 40 - winEl.offsetHeight; // taskbar height
          x = Math.max(0, Math.min(x, maxX));
          y = Math.max(0, Math.min(y, maxY));
          setWinPositions(prev => ({ ...prev, [id]: { x, y } }));
      }
    };
    const handleMouseUp = () => {
      dragRef.current = null;
    };
    if(Object.keys(winPositions).length > 0) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [winPositions]);

  // Mobile tap logic
  const lastTap = useRef({});
  const handleIconTap = (e, id) => {
    e.preventDefault();
    const now = Date.now();
    if (lastTap.current[id] && now - lastTap.current[id] < 500) {
      openWin(id);
    } else {
      if (window.innerWidth <= 600) openWin(id);
    }
    lastTap.current[id] = now;
    setSelectedIcon(id);
  };

  return (
    <>
      {booting && (
        <div
          id="boot"
          style={{
            opacity: bootPct >= 100 ? 0 : 1,
            transition: "opacity 0.4s",
            pointerEvents: bootPct >= 100 ? "none" : "auto",
          }}
        >
          <div className="logo">
            CJ'S PICKS
            <br />
            <small style={{ fontSize: "0.5em", letterSpacing: "1px", color: "#888" }}>
              cplusplusj · v1.0
            </small>
          </div>
          <div className="progress-wrap">
            <div id="boot-bar" style={{ width: `${bootPct}%` }}></div>
          </div>
          <div className="hint" id="boot-hint">
            {bootHint}
          </div>
        </div>
      )}

      <div id="desktop">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={`icon ${selectedIcon === icon.id ? "selected" : ""}`}
            onDoubleClick={() => openWin(icon.id)}
            onTouchEnd={(e) => handleIconTap(e, icon.id)}
            onClick={() => setSelectedIcon(icon.id)}
          >
            <div className="ico">{icon.icon}</div>
            <span>{icon.label}</span>
          </div>
        ))}
      </div>

      {openWindows.map((id) => {
        const winConfig = windowsData[id];
        const isMinimized = minimizedWindows.includes(id);
        const position = winPositions[id] || { x: winConfig.defaultLeft, y: winConfig.defaultTop };
        
        return (
          <div
            key={id}
            id={`win-${id}`}
            className={`win ${focusedWindow === id ? "focused" : ""}`}
            style={{
              display: isMinimized ? "none" : "flex",
              top: position.y,
              left: position.x,
              width: winConfig.width,
              zIndex: focusedWindow === id ? topZ : 100,
            }}
            onMouseDown={() => focusWin(id)}
          >
            <div
              className="win-titlebar"
              onMouseDown={(e) => handleDragStart(e, id)}
            >
              <span className="ico">{winConfig.icon}</span>
              <span className="title">{winConfig.title}</span>
              <div className="win-btns">
              <button
                  className="win-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize(id);
                  }}
                >
                  _
                </button>
                <button
                  className="win-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWin(id);
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="win-body">
              {winConfig.isAbout ? (
                <div className="about-body">
                  <p><strong>CJ Arcet</strong> — @cplusplusj</p>
                  <p>software engineer in progress.<br />i find the good stuff so you don't have to.</p>
                  <p>
                    <span className="tag">42 Tirana</span>
                    <span className="tag">Albania 🇦🇱</span>
                    <span className="tag">Arcet Group</span>
                    <span className="tag">local AI</span>
                    <span className="tag">builder</span>
                  </p>
                  <p style={{ marginTop: "10px" }}>This page gets updated. Bookmark it.</p>
                  <div style={{ marginTop: "12px", borderTop: "1px solid #808080", paddingTop: "8px" }}>
                    {winConfig.socialLinks?.map((link, lidx) => (
                      <a key={lidx} className="link-item" href={link.url} target="_blank" rel="noopener noreferrer">
                        <span className="li-ico">{link.icon}</span>
                        <div className="li-info">
                          <span className="li-name">{link.name}</span>
                          <span className="li-desc">{link.desc}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                winConfig.content.map((sec, idx) => (
                  <div key={idx} className="link-section">
                    <h3>{sec.section}</h3>
                    {sec.links.map((link, lidx) => (
                      <a
                        key={lidx}
                        className="link-item"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="li-ico">{link.icon}</span>
                        <div className="li-info">
                          <span className="li-name">{link.name}</span>
                          <span className="li-desc">{link.desc}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}

      <div id="taskbar">
        <button id="start-btn" onClick={() => setStartOpen(!startOpen)}>
          <span className="win-logo">🪟</span> Start
        </button>
        <div id="taskbar-buttons">
          {openWindows.map((id) => (
            <button
              key={id}
              className={`taskbar-btn ${focusedWindow === id && !minimizedWindows.includes(id) ? "active" : ""}`}
              onClick={() => toggleMinimize(id)}
            >
              {windowsData[id].icon} {windowsData[id].title.split(" ")[0]}
            </button>
          ))}
        </div>
        <div id="clock">{time}</div>
      </div>

      <div id="start-menu" className={startOpen ? "open" : ""}>
        <div className="start-header">🪟 CJ's Picks</div>
        {startMenuItems.map((item, idx) => {
          if (item.id === "about") {
            return (
              <React.Fragment key={item.id}>
                <div className="start-divider"></div>
                <div
                  className="start-item"
                  onClick={() => {
                    openWin(item.id);
                    setStartOpen(false);
                  }}
                >
                  {item.icon} {item.label}
                </div>
              </React.Fragment>
            );
          }
          return (
            <div
              key={item.id}
              className="start-item"
              onClick={() => {
                openWin(item.id);
                setStartOpen(false);
              }}
            >
              {item.icon} {item.label}
            </div>
          );
        })}
      </div>
    </>
  );
}
