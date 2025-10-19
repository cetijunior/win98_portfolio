// src/App.jsx
import React from "react";
import useScreenType from "./hooks/useScreenType.jsx";
import DesktopExperience from "./components/experiences/DesktopExperience";
import MobileExperience from "./components/experiences/MobileExperience";

export default function App() {
	const { isMobile } = useScreenType();

	// Use a simple conditional render based on screen size
	return isMobile ? <MobileExperience /> : <DesktopExperience />;
}
