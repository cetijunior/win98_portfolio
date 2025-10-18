import React, { useEffect, useMemo, useState } from "react";
import WindowFrame from "./WindowFrame.jsx";
import Taskbar from "./Taskbar.jsx";
import StartMenu from "./StartMenu.jsx";

// ============================================
// MAIN WIN95OS COMPONENT
// ============================================
export default function Win95OS() {
	const [wins, setWins] = useState([]);
	const [zTop, setZTop] = useState(10);
	const [startOpen, setStartOpen] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState(null);
	const [contextMenu, setContextMenu] = useState(null);
	const isMobile = useMemo(
		() => window.matchMedia("(max-width: 768px)").matches,
		[]
	);

	function focus(id) {
		setWins((w) =>
			w.map((x) => (x.id === id ? { ...x, z: zTop + 1, minimized: false } : x))
		);
		setZTop((z) => z + 1);
		setSelectedIcon(null);
	}

	function closeWin(id) {
		setWins((w) => w.filter((x) => x.id !== id));
	}

	function minimize(id) {
		setWins((w) => w.map((x) => (x.id === id ? { ...x, minimized: true } : x)));
	}

	function open(kind) {
		const id = `${kind}-${Math.random().toString(36).slice(2, 7)}`;
		const titles = {
			resume: "📄 Documents — Résumé",
			projects: "💾 My Computer",
			skills: "⚙️ Run — Skills Terminal",
			about: "ℹ️ About Me",
		};

		const contentMap = {
			resume: (
				<div className="text-sm text-gray-800">
					<h2 className="font-bold mb-2">Resume</h2>
					<p className="mb-2">Your resume content goes here</p>
					<p className="text-xs text-gray-600">
						Click to download your full resume
					</p>
				</div>
			),
			projects: (
				<div className="text-sm text-gray-800">
					<h2 className="font-bold mb-2">My Computer</h2>
					<div className="space-y-1">
						<div className="flex items-center gap-2 p-1 hover:bg-white/50 cursor-pointer">
							<span>💾</span> <span>Local Disk (C:)</span>
						</div>
						<div className="flex items-center gap-2 p-1 hover:bg-white/50 cursor-pointer">
							<span>📁</span> <span>Projects</span>
						</div>
						<div className="flex items-center gap-2 p-1 hover:bg-white/50 cursor-pointer">
							<span>📁</span> <span>Documents</span>
						</div>
					</div>
				</div>
			),
			skills: (
				<div className="text-sm text-gray-800 font-mono">
					<div className="text-green-700 mb-2">
						C:\Users\Developer\Skills&gt;
					</div>
					<p className="mb-1">• JavaScript / React</p>
					<p className="mb-1">• Python / Backend</p>
					<p className="mb-1">• Full Stack Development</p>
					<p className="mb-1">• UI/UX Design</p>
					<div className="mt-4 text-green-700">
						C:\Users\Developer\Skills&gt;_
					</div>
				</div>
			),
			about: (
				<div className="text-sm text-gray-800">
					<h2 className="font-bold mb-2">About Me</h2>
					<p className="mb-2">
						Welcome to my Windows 95 inspired portfolio! This retro-themed
						website showcases my projects and skills in a fun, nostalgic way.
					</p>
					<p className="text-xs text-gray-600">
						Built with React, Tailwind CSS, and a lot of nostalgia ✨
					</p>
				</div>
			),
		};

		const base = {
			kind,
			title: titles[kind] || "New Window",
			defaultSize: isMobile
				? { width: "100%", height: "100%" }
				: { width: 620, height: 420 },
			defaultPos: isMobile
				? { x: 0, y: 0 }
				: {
						x: 80 + ((wins.length * 24) % 200),
						y: 60 + ((wins.length * 18) % 160),
				  },
			content: contentMap[kind] || null,
		};

		setWins((w) => [...w, { id, z: zTop + 1, minimized: false, ...base }]);
		setZTop((z) => z + 1);
		setSelectedIcon(null);
		setContextMenu(null);
	}

	const icons = [
		{
			id: "my-computer",
			label: "My Computer",
			icon: "💾",
			onOpen: () => open("projects"),
		},
		{
			id: "documents",
			label: "Documents",
			icon: "📄",
			onOpen: () => open("resume"),
		},
		{
			id: "run",
			label: "Skills Terminal",
			icon: "⚙️",
			onOpen: () => open("skills"),
		},
		{
			id: "about",
			label: "About Me",
			icon: "ℹ️",
			onOpen: () => open("about"),
		},
		{
			id: "recycle",
			label: "Recycle Bin",
			icon: "🗑️",
			onOpen: () => {},
		},
	];

	useEffect(() => {
		open("projects");
	}, []);

	const handleDesktopClick = () => {
		setSelectedIcon(null);
		setContextMenu(null);
	};

	const handleContextMenu = (e) => {
		e.preventDefault();
		setContextMenu({ x: e.clientX, y: e.clientY });
	};

	return (
		<div
			className="relative w-full h-full select-none overflow-hidden"
			onContextMenu={handleContextMenu}
			onClick={handleDesktopClick}
		>
			{/* Wallpaper */}
			<img src="/wallpaper.png" className="absolute inset-0" />

			{/* Desktop icons */}
			<div className="absolute z-10 top-4 left-4 right-4 bottom-12 grid grid-cols-[repeat(auto-fill,80px)] gap-6 content-start pointer-events-auto">
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
						<div className="text-3xl">{ic.icon}</div>
						<div className="text-xs text-white text-center leading-tight truncate w-full font-medium">
							{ic.label}
						</div>
					</div>
				))}
			</div>

			{/* Windows in work area */}
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
						{w.content}
					</WindowFrame>
				))}
			</div>

			{/* Taskbar */}
			<Taskbar
				onStart={() => setStartOpen(!startOpen)}
				wins={wins}
				onToggle={(id) =>
					setWins((w) =>
						w.map((x) =>
							x.id === id ? { ...x, minimized: !x.minimized, z: zTop + 1 } : x
						)
					)
				}
				onMinimize={(id) =>
					setWins((w) =>
						w.map((x) => (x.id === id ? { ...x, minimized: true } : x))
					)
				}
				onClose={(id) => setWins((w) => w.filter((x) => x.id !== id))}
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
					<div className="px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer">
						New Folder
					</div>
					<div className="px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer">
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
