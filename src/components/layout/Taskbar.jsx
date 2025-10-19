// src/components/Taskbar.jsx
import React, { useEffect, useState } from "react";

export default function Taskbar({
	onStart,
	wins,
	onToggle,
	onMinimize, // still required if windows can be minimized
	onClose,
}) {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		// Sets up the clock interval
		const i = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(i);
	}, []);

	return (
		<div
			className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-[#c0c0c0] to-[#808080] border-t-2 flex items-center px-2 gap-2 z-[9999] text-black"
			style={{
				borderColor: "#dfdfdf #808080 #808080 #dfdfdf",
				boxShadow:
					"inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.3)",
			}}
		>
			{/* Start Button */}
			<button
				// Increased padding/height slightly for better touch targets
				className="px-3 py-1 font-bold text-sm text-black hover:brightness-110 active:brightness-90 transition-all flex items-center gap-1 h-10 flex-shrink-0"
				style={{
					background: "linear-gradient(180deg, #dfdfdf 0%, #808080 100%)",
					border: "2px solid #dfdfdf",
					boxShadow:
						"inset 1px 1px 0 rgba(255,255,255,0.8), inset -1px -1px 0 rgba(0,0,0,0.5), 1px 1px 0 rgba(0,0,0,0.3)",
				}}
				onClick={onStart}
			>
				<span className="text-lg">🪟</span> Start
			</button>

			{/* Separator */}
			<div className="w-px h-8 bg-gradient-to-b from-white via-gray-400 to-black opacity-50 flex-shrink-0" />

			{/* Taskbar buttons container */}
			<div
				className="flex-1 flex items-center gap-1 overflow-x-auto overflow-y-hidden"
				// Hide scrollbar on mobile browsers (optional)
				style={{
					WebkitOverflowScrolling: "touch",
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}
			>
				{wins.map((w) => (
					<button
						key={w.id}
						onClick={() => onToggle(w.id)}
						title={w.title}
						// Added max-width to ensure the button doesn't stretch too much on wide screens
						// and better supports multiple windows on mobile
						className={`px-2 py-1 text-xs font-bold text-black transition-all truncate whitespace-nowrap h-10 flex items-center max-w-[140px] flex-shrink-0
                            ${w.minimized ? "opacity-70" : ""}
                            ${
															!w.minimized
																? "ring-2 ring-inset ring-blue-900"
																: ""
														}
                        `}
						style={{
							background: "linear-gradient(180deg, #dfdfdf 0%, #808080 100%)",
							border: "2px solid #dfdfdf",
							boxShadow:
								"inset 1px 1px 0 rgba(255,255,255,0.8), inset -1px -1px 0 rgba(0,0,0,0.5), 1px 1px 0 rgba(0,0,0,0.3)",
						}}
					>
						{/* Title only - simplified for small screens */}
						<span className="flex-1 text-left truncate">{w.title}</span>
					</button>
				))}
			</div>

			{/* System Tray Separator */}
			<div className="w-px h-8 bg-gradient-to-b from-white via-gray-400 to-black opacity-50 flex-shrink-0" />

			{/* Clock */}
			<div
				className="text-xs font-mono font-bold text-black px-2 py-1 h-10 flex items-center flex-shrink-0"
				style={{
					border: "2px solid #dfdfdf",
					boxShadow:
						"inset 1px 1px 0 rgba(255,255,255,0.8), inset -1px -1px 0 rgba(0,0,0,0.5)",
					background: "linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 100%)",
				}}
			>
				{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
			</div>
		</div>
	);
}
