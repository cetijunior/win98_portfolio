import React, { useState, useRef } from "react";
import StartMenu from "../layout/StartMenu";
import Taskbar from "../layout/Taskbar";
import WindowFrame from "../layout/WindowFrame";
// ------------------------------------------------------------------
// ⚠️ NEW APP IMPORTS: Use the new, richer components
// ------------------------------------------------------------------
import MyComputerApp from "../apps/MyComputerApp";
import DocumentsApp from "../apps/DocumentsApp";
import TerminalApp from "../apps/TerminalApp";
import AboutApp from "../apps/AboutApp"; // Assuming you've created this file from the last response
// ------------------------------------------------------------------

import useWindowManagement from "../../hooks/useWindowManagment"; // Adjust path as needed

// Desktop Items - Remains the same
const DESKTOP_ITEMS = [
	{
		id: "projects",
		title: "My Computer",
		icon: "/icons/my-computer.png",
		action: "projects",
	},
	{
		id: "resume",
		title: "Documents",
		icon: "/icons/documents.png",
		action: "resume",
	},
	{
		id: "skills",
		title: "Skills Terminal",
		icon: "/icons/run.png",
		action: "skills",
	},
	{ id: "about", title: "About Me", icon: "/icons/about.png", action: "about" },
];

// Map the action ID to the correct Component for cleaner rendering logic
const AppComponents = {
	projects: MyComputerApp,
	resume: DocumentsApp,
	skills: TerminalApp,
	about: AboutApp,
};

// Removed getWindowComponent function and replaced it with direct component usage
// in the render loop for cleaner code.

// Desktop Icon Component - Remains the same
const DesktopIcon = ({ item, onOpen }) => (
	<div
		className="hidden  flex-col items-center w-20 p-1 cursor-pointer hover:bg-black/20"
		onDoubleClick={() => onOpen(item.action)}
	>
		<img src={item.icon} alt={item.title} className="w-8 h-8" />
		<span className="text-white text-xs text-center mt-1 select-none font-sans">
			{item.title}
		</span>
	</div>
);

// Default Desktop Window Dimensions - Remains the same
const INITIAL_POS = { x: 80, y: 60 };
const INITIAL_SIZE = { width: 620, height: 420 };

export default function DesktopExperience() {
	const desktopRef = useRef(null);
	const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

	// Use the window management hook
	const { wins, onOpen, onFocus, onClose, onMinimize, onToggle } =
		useWindowManagement();

	return (
		<div
			ref={desktopRef}
			className="w-screen h-screen bg-cover relative overflow-hidden font-sans"
			style={{ backgroundImage: "url(/wallpaper.png)" }}
		>
			{/* Desktop Icons - Visible on Desktop/Tablet */}
			<div className="absolute top-2 left-2 flex flex-col gap-4">
				{DESKTOP_ITEMS.map((item) => (
					<DesktopIcon
						key={item.id}
						item={item}
						onOpen={() => onOpen(item.action, INITIAL_POS, INITIAL_SIZE)}
					/>
				))}
			</div>

			{/* Render Open Windows */}
			{wins.map((win) => {
				// 1. Find the component based on the window ID
				const WindowContent = AppComponents[win.id];

				// 2. Safely return if the component is not found
				if (!WindowContent) return null;

				// 3. Render the WindowFrame and the content component inside it
				return (
					<WindowFrame
						key={win.id}
						spec={win}
						containerQuery={desktopRef.current}
						onFocus={() => onFocus(win.id)}
						onClose={() => onClose(win.id)}
						onMinimize={() => onMinimize(win.id)}
					>
						{/* Render the specific content component */}
						<WindowContent />
					</WindowFrame>
				);
			})}

			{/* Start Menu */}
			<StartMenu
				isOpen={isStartMenuOpen}
				onClose={() => setIsStartMenuOpen(false)}
				// Use the desktop item actions for the Start Menu
				menuItems={DESKTOP_ITEMS}
				onOpen={(id) => onOpen(id, INITIAL_POS, INITIAL_SIZE)}
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
