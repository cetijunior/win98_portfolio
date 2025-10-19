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
		const i = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(i);
	}, []);

	return (
		<div
			className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-[#c0c0c0] to-[#808080] border-t-2 flex items-center px-2 gap-2 z-[9999]"
			style={{
				borderColor: "#dfdfdf #808080 #808080 #dfdfdf",
				boxShadow:
					"inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.3)",
			}}
		>
			{/* Start Button */}
			<button
				className="px-3 py-1 font-bold text-sm text-black hover:brightness-110 active:brightness-90 transition-all flex items-center gap-1 h-8"
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
			<div className="w-px h-6 bg-gradient-to-b from-white via-gray-400 to-black opacity-50" />

			{/* Taskbar buttons */}
			<div className="flex-1 flex items-center gap-1 overflow-x-auto">
				{wins.map((w) => (
					<button
						key={w.id}
						className={`px-2 py-1 text-xs font-bold text-black hover:brightness-110 active:brightness-90 transition-all truncate whitespace-nowrap h-8 flex items-center gap-2 ${
							!w.minimized ? "ring-2 ring-inset ring-blue-900" : ""
						}`}
						style={{
							background: "linear-gradient(180deg, #dfdfdf 0%, #808080 100%)",
							border: "2px solid #dfdfdf",
							boxShadow:
								"inset 1px 1px 0 rgba(255,255,255,0.8), inset -1px -1px 0 rgba(0,0,0,0.5), 1px 1px 0 rgba(0,0,0,0.3)",
						}}
						onClick={() => onToggle(w.id)}
						title={w.title}
					>
						<span className="flex-1 text-left">{w.title}</span>
						<div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
							{/* REMOVED MINIMIZE BUTTON HERE */}
							<div
								className="w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-700/80 cursor-pointer"
								style={{
									border: "1px solid #dfdfdf",
									boxShadow:
										"inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.5)",
								}}
								onClick={(e) => {
									e.stopPropagation();
									onClose(w.id);
								}}
								title="Close"
							>
								×
							</div>
						</div>
					</button>
				))}
			</div>

			{/* Clock */}
			<div
				className="text-xs font-mono font-bold text-black px-2 py-1 h-8 flex items-center"
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
