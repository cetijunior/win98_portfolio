// src/components/apps/AboutApp.jsx
import React from "react";

export default function AboutApp() {
	return (
		<div className="h-full w-full flex flex-col p-4 bg-[#c0c0c0] font-sans text-sm overflow-y-auto">
			{/* Header box - Classic 98 look */}
			<div className="p-3 bg-white border border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-inner mb-4">
				<h3 className="text-lg font-bold text-[#000080] mb-1">Welcome! 👋</h3>
				<p className="text-xs text-gray-700">
					A brief summary of this portfolio project.
				</p>
			</div>
			{/* Content Body */}
			<div className="space-y-4 text-black">
				<p>
					This **retro-styled portfolio** is built using modern web
					technologies: **React** (with Hooks), **Tailwind CSS** for styling,
					and the **Rnd** library for draggable, resizable windows. It's
					designed to give a nostalgic, yet fully responsive and functional,
					user experience.
				</p>
				<p>
					The primary goal on mobile is **usability**. All windows are forced
					into a maximized state to prevent accidental dragging and ensure
					large, touch-friendly content areas. The `Taskbar` and `StartMenu`
					provide easy, consistent navigation.
				</p>
				<div className="p-2 border border-black/30 bg-gray-200">
					<p className="text-xs font-bold text-gray-700">Development Stack:</p>
					<ul className="list-disc list-inside ml-2 text-xs">
						<li>**Frontend:** React, HTML5, JavaScript</li>
						<li>**Styling:** Tailwind CSS (customized for Win98 aesthetics)</li>
						<li>**Windowing:** `react-rnd` with custom drag/resize logic</li>
					</ul>
				</div>
				<p>
					Feel free to minimize and open multiple windows! If you're on a
					desktop, try maximizing and resizing them to see the full effect.
				</p>
			</div>
			<div className="mt-auto h-8 flex-shrink-0"></div>{" "}
			{/* Spacer for bottom padding */}
		</div>
	);
}
