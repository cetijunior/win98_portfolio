import React, { useState, useRef } from "react";
import StartMenu from "../StartMenu";
import Taskbar from "../Taskbar";
import WindowFrame from "../WindowFrame";
import ProjectsWindow from "../../components/apps/ProjectsWindow"; // Adjust path as needed
import ResumeWindow from "../../components/apps/ResumeWindow"; // Adjust path as needed
import SkillsTerminal from "../../components/apps/SkillsTerminal"; // Adjust path as needed
import useWindowManagement from "../../hooks/useWindowManagment"; // Adjust path as needed

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

// Window Content Components
const getWindowComponent = (id) => {
	switch (id) {
		case "projects":
			return (
				<ProjectsWindow openDetail={(title) => alert(`Detail for ${title}`)} />
			);
		case "resume":
			return <ResumeWindow />;
		case "skills":
			return <SkillsTerminal />;
		case "about":
			return <AboutApp />;
		default:
			return (
				<div className="p-4 text-red-600">
					Error: App not found for ID: {id}
				</div>
			);
	}
};

// Desktop Icon Component
const DesktopIcon = ({ item, onOpen }) => (
	<div
		className="flex flex-col items-center w-20 p-1 cursor-pointer hover:bg-black/20"
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
	const { wins, onOpen, onFocus, onClose, onMinimize, onToggle } =
		useWindowManagement();

	return (
		<div
			ref={desktopRef}
			className="w-screen h-screen bg-cover relative overflow-hidden font-sans"
			style={{ backgroundImage: "url(/wallpaper.png)" }} // Updated to use background image
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
						>
							{getWindowComponent(win.id)}
						</WindowFrame>
					)
			)}

			{/* Start Menu */}
			<StartMenu
				isOpen={isStartMenuOpen}
				onClose={() => setIsStartMenuOpen(false)}
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

// Placeholder for AboutApp (to be implemented)
const AboutApp = () => (
	<div className="p-4 bg-white rounded shadow-md">
		<h3 className="font-bold text-lg text-gray-800">About Me</h3>
		<p className="text-sm text-gray-600 mt-2">
			Welcome to my Windows 95 inspired portfolio! This retro-themed website
			showcases my projects and skills in a fun, nostalgic way. Built with
			React, Tailwind CSS, and a lot of nostalgia ✨
		</p>
		<p className="text-xs text-gray-500 mt-1">
			Contact: lameceti1@gmail.com | GitHub: cetijunior | LinkedIn: Shefqet (CJ)
			Lame
		</p>
	</div>
);
