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
import AboutApp from "../apps/AboutApp";
// ------------------------------------------------------------------

// 🚀 FIX: Corrected typo from useWindowManagment to useWindowManagement
import useWindowManagement from "../../hooks/useWindowManagment";

// Desktop Items
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
	// Add any other components here as needed
};

// Desktop Icon Component
const DesktopIcon = ({ item, onOpen }) => (
	<div
		className="flex flex-col items-center w-20 p-1 cursor-pointer hover:bg-black/20 hidden sm:flex" // Added hidden sm:flex for mobile icon hiding
		onDoubleClick={() => onOpen(item.action)}
	>
		<img src={item.icon} alt={item.title} className="w-8 h-8" />
		<span className="text-white text-xs text-center mt-1 select-none font-sans">
			{item.title}
		</span>
	</div>
);

// Default Desktop Window Dimensions
const INITIAL_POS = { x: 80, y: 60 };
const INITIAL_SIZE = { width: 620, height: 420 };

export default function DesktopExperience() {
	const desktopRef = useRef(null);
	const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

	// Use the window management hook
	const {
		wins,
		onOpen,
		onFocus,
		onClose,
		onMinimize,
		onToggle,
		onDragResizeStop,
	} = useWindowManagement();

	/**
	 * 🚀 NEW: Renders the appropriate component based on the window ID.
	 * This was the missing piece causing the window content to be blank.
	 */
	const renderWindowContent = (id) => {
		const Component = AppComponents[id];
		if (Component) {
			// Pass the onOpen function down to inner components if they need to launch new windows
			return <Component onOpen={onOpen} />;
		}
		return <div>Application not found for ID: {id}</div>;
	};

	return (
		<div
			ref={desktopRef}
			className="w-screen h-screen bg-cover relative overflow-hidden font-sans"
			style={{ backgroundImage: "url(/wallpaper.png)" }}
			// Add handler to close Start Menu when clicking desktop
			onMouseDown={() => setIsStartMenuOpen(false)}
		>
			{/* Desktop Icons - Visible on Desktop/Tablet */}
			<div className="absolute top-2 left-2 flex flex-col gap-4 z-10">
				{DESKTOP_ITEMS.map((item) => (
					<DesktopIcon
						key={item.id}
						item={item}
						// Ensure we pass the initial pos/size when opening a new window
						onOpen={() => onOpen(item.action, INITIAL_POS, INITIAL_SIZE)}
					/>
				))}
			</div>

			{/* Render Open Windows */}
			{wins.map(
				(win) =>
					win && (
						<WindowFrame
							key={win.id}
							spec={win}
							containerQuery={desktopRef.current}
							onFocus={() => onFocus(win.id)}
							onClose={() => onClose(win.id)}
							onMinimize={() => onMinimize(win.id)}
							onDragResizeStop={onDragResizeStop} // <-- Passes new position/size back to hook
						>
							{/* Call the new rendering function */}
							{renderWindowContent(win.id)}
						</WindowFrame>
					)
			)}

			{/* Start Menu */}
			<StartMenu
				isOpen={isStartMenuOpen}
				onClose={() => setIsStartMenuOpen(false)}
				// Use the desktop item actions for the Start Menu
				menuItems={DESKTOP_ITEMS}
				// Ensure we pass the initial pos/size when opening a new window from the menu
				onOpen={(id) => {
					onOpen(id, INITIAL_POS, INITIAL_SIZE);
					setIsStartMenuOpen(false); // Close menu on launch
				}}
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
