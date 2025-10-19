// src/experiences/MobileExperience.jsx
import React, { useState, useRef } from "react";
import StartMenu from "../StartMenu";
import Taskbar from "../Taskbar";
import WindowFrame from "../WindowFrame";
// import { useWindowManagement } from '../hooks/useWindowManagement'; // Placeholder for window logic
// import { getWindowComponent } from '../data/windows';

// Dummy Data and Components (REPLACE WITH YOUR ACTUAL IMPORTS)
const getWindowComponent = (id) => {
	// You need to import and use your actual window components here
	return <div className="text-sm">Content for {id}</div>;
};
const MobileCenteredPos = (window) => {
	const defaultWidth = window.innerWidth * 0.9;
	const defaultHeight = window.innerHeight * 0.6;
	return {
		x: (window.innerWidth - defaultWidth) / 2,
		y: (window.innerHeight - 48 - defaultHeight) / 2, // Centered above Taskbar
	};
};
const MOBILE_POS = MobileCenteredPos(window);
const MOBILE_SIZE = {
	width: window.innerWidth * 0.9,
	height: window.innerHeight * 0.6,
};
// END OF DUMMY DATA

export default function MobileExperience() {
	const desktopRef = useRef(null);
	const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

	// Placeholder for your window state management
	const { wins, onOpen, onFocus, onClose, onMinimize, onToggle } = {
		wins: [], // Replace with actual state
		onOpen: (id) => console.log("Open window:", id), // Implement in your logic
		onFocus: () => {},
		onClose: () => {},
		onMinimize: () => {},
		onToggle: () => {},
	};

	return (
		<div
			ref={desktopRef}
			// Background and overall desktop look
			className="w-screen h-screen bg-teal-700 relative overflow-hidden font-sans"
		>
			{/* Desktop Icons are intentionally OMITTED on mobile */}

			{/* Render Open Windows */}
			{wins.map((win) => (
				<WindowFrame
					key={win.id}
					spec={{ ...win, defaultPos: MOBILE_POS, defaultSize: MOBILE_SIZE }}
					containerQuery={desktopRef.current}
					onFocus={() => onFocus(win.id)}
					onClose={() => onClose(win.id)}
					onMinimize={() => onMinimize(win.id)}
				>
					{getWindowComponent(win.id)}
				</WindowFrame>
			))}

			{/* Start Menu (Positioned to open just above the taskbar) */}
			<StartMenu
				isOpen={isStartMenuOpen}
				onClose={() => setIsStartMenuOpen(false)}
				// All new windows are forced to the mobile position/size for touch comfort
				onOpen={(id) => onOpen(id, MOBILE_POS, MOBILE_SIZE)}
			/>

			{/* Taskbar */}
			<Taskbar
				onStart={() => setIsStartMenuOpen((prev) => !prev)}
				wins={wins}
				onToggle={onToggle}
				onMinimize={onMinimize}
				onClose={onClose}
			/>
		</div>
	);
}
