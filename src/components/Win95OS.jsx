// src/components/Win95OS.jsx
import React, {
	useCallback,
	useEffect, // Keep useEffect for general component lifecycle, but remove the problematic call
	useMemo,
	useRef,
	useState,
} from "react";
import WindowFrame from "./WindowFrame.jsx";
import Taskbar from "./Taskbar.jsx";
import StartMenu from "./StartMenu.jsx";

// Existing app windows
import ProjectsWindow from "./apps/ProjectsWindow.jsx";
import ResumeWindow from "./apps/ResumeWindow.jsx";
import SkillsTerminal from "./apps/SkillsTerminal.jsx";

export default function Win95OS() {
	const [wins, setWins] = useState([]);
	const [zTop, setZTop] = useState(10);
	const [startOpen, setStartOpen] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState(null);
	const [contextMenu, setContextMenu] = useState(null);
	const desktopRef = useRef(null);

	const isMobile = useMemo(
		() => window.matchMedia("(max-width: 768px)").matches,
		[]
	);

	/**
	 * Focus a window: bring to front and unminimize.
	 */
	const focus = useCallback(
		(id) => {
			let newZ = zTop + 1;
			setWins((w) =>
				w.map((x) => (x.id === id ? { ...x, z: newZ, minimized: false } : x))
			);
			setZTop(newZ);
			setSelectedIcon(null);
		},
		[zTop]
	);

	function closeWin(id) {
		setWins((w) => w.filter((x) => x.id !== id));
	}

	function minimize(id) {
		setWins((w) => w.map((x) => (x.id === id ? { ...x, minimized: true } : x)));
	}

	const open = useCallback(
		(kind) => {
			const id = `${kind}-${Math.random().toString(36).slice(2, 7)}`;

			const title =
				kind === "resume"
					? "Documents — Résumé"
					: kind === "projects"
					? "My Computer — Projects"
					: kind === "skills"
					? "Run — Skills Terminal"
					: kind === "about"
					? "About Me"
					: "Window";

			const base = {
				kind,
				title,
				defaultSize: isMobile
					? { width: "100vw", height: "90vh" }
					: { width: 620, height: 420 },
				defaultPos: isMobile
					? { x: 0, y: 0 }
					: {
							// Using wins.length here is okay because it's only read when a new window is opened
							x: 80 + (((wins.length + 1) * 24) % 200),
							y: 60 + (((wins.length + 1) * 18) % 160),
					  },
			};

			const newZ = zTop + 1;
			setWins((w) => [...w, { id, z: newZ, minimized: false, ...base }]);
			setZTop(newZ);
			setSelectedIcon(null);
			setContextMenu(null);
		},
		[isMobile, wins.length, zTop]
	);

	// Desktop icons (use your existing PNGs)
	const icons = [
		{
			id: "my-computer",
			label: "My Computer",
			src: "/icons/my-computer.png",
			onOpen: () => open("projects"),
		},
		{
			id: "documents",
			label: "Documents",
			src: "/icons/documents.png",
			onOpen: () => open("resume"),
		},
		{
			id: "run",
			label: "Skills Terminal",
			src: "/icons/run.png",
			onOpen: () => open("skills"),
		},
		{
			id: "about",
			label: "About Me",
			src: "/icons/about.png",
			onOpen: () => open("about"),
		},
		{
			id: "recycle",
			label: "Recycle Bin",
			src: "/icons/recycle.png",
			onOpen: () => {},
		},
	];

	// FIX: Removed the useEffect hook that automatically opened a window on mount.
	// useEffect(() => {
	// 	open("projects");
	// }, [open]);

	const handleDesktopClick = () => {
		setSelectedIcon(null);
		setContextMenu(null);
	};

	const handleContextMenu = (e) => {
		e.preventDefault();
		setContextMenu({ x: e.clientX, y: e.clientY });
	};

	/**
	 * Taskbar onToggle handler.
	 */
	const handleTaskbarToggle = useCallback(
		(id) => {
			const win = wins.find((w) => w.id === id);
			if (win && win.minimized) {
				focus(id); // Un-minimize and bring to front
			} else if (win) {
				minimize(id); // Just minimize
			}
		},
		[wins, focus]
	);

	return (
		<div
			ref={desktopRef}
			className="relative w-screen h-screen select-none overflow-hidden bg-cover"
			style={{ backgroundImage: "url(/wallpaper.png)" }}
			onContextMenu={handleContextMenu}
			onClick={handleDesktopClick}
		>
			{/* Desktop icons */}
			<div className="absolute z-10 top-4 left-4 right-4 bottom-12 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,80px)] gap-6 content-start pointer-events-auto">
				{icons.map((ic) => (
					<div
						key={ic.id}
						className={`flex flex-col items-center gap-2 cursor-pointer group p-2 rounded transition-all ${
							selectedIcon === ic.id
								? "bg-[#000080] text-white"
								: "hover:bg-white/10"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							setSelectedIcon(ic.id);
						}}
						onDoubleClick={(e) => {
							e.stopPropagation();
							ic.onOpen();
						}}
						title={ic.label}
					>
						<img
							src={ic.src}
							alt={ic.label}
							className="w-12 h-12 object-contain"
							onError={(e) => (e.target.src = "/fallback-icon.png")}
						/>
						<div className="text-xs text-white text-center leading-tight truncate w-full font-medium">
							{ic.label}
						</div>
					</div>
				))}
			</div>

			{/* Windows area (kept above taskbar) */}
			<div className="workarea absolute inset-x-0 top-0 bottom-12 pointer-events-auto">
				{wins.map((w) => (
					<WindowFrame
						key={w.id}
						spec={w}
						containerQuery=".workarea"
						onFocus={() => focus(w.id)}
						onClose={() => closeWin(w.id)}
						onMinimize={() => minimize(w.id)}
					>
						{/* Use existing components based on window kind */}
						{w.kind === "projects" && <ProjectsWindow openDetail={() => {}} />}
						{w.kind === "resume" && <ResumeWindow />}
						{w.kind === "skills" && <SkillsTerminal />}
						{w.kind === "about" && (
							<div className="text-sm text-gray-800 space-y-2 p-3">
								<h3 className="font-bold">About Me</h3>
								<p>
									Welcome to my **Windows 95–inspired portfolio**. Built with
									React + Tailwind, featuring a retro OS window manager for
									projects, résumé, and skills.
								</p>
							</div>
						)}
						{/* If using the PDF viewer: {w.kind === "resumePdf" && <ResumePDFViewer />} */}
					</WindowFrame>
				))}
			</div>

			{/* Taskbar */}
			<Taskbar
				onStart={() => setStartOpen(!startOpen)}
				wins={wins}
				onToggle={handleTaskbarToggle}
				onMinimize={minimize}
				onClose={closeWin}
			/>

			{/* Start Menu */}
			<StartMenu
				isOpen={startOpen}
				onClose={() => setStartOpen(false)}
				onOpen={(kind) => open(kind)}
			/>

			{/* Context Menu */}
			{contextMenu && (
				<div
					className="fixed bg-[#c0c0c0] py-1 z-50 text-xs font-bold"
					style={{
						left: `${contextMenu.x}px`,
						top: `${contextMenu.y}px`,
						border: "2px solid #dfdfdf",
						boxShadow:
							"inset 1px 1px 0 rgba(255,255,255,.8), 1px 1px 0 rgba(0,0,0,.5)",
					}}
					onClick={(e) => e.stopPropagation()}
				>
					<div
						className="px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer"
						onClick={() => open("projects")}
					>
						New Window
					</div>
					<div
						className="px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer"
						onClick={() => window.location.reload()}
					>
						Refresh
					</div>
					<hr className="my-1 bg-[#808080] h-px border-0" />
					<div className="px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer">
						Properties
					</div>
				</div>
			)}
		</div>
	);
}
