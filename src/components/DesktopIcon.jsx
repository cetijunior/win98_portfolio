// src/components/DesktopIcon.jsx
import React from "react";

export default function DesktopIcon({ label, src, onOpen }) {
	return (
		<button
			className="flex flex-col items-center gap-1 text-white/90 hover:text-white focus:outline-none"
			onDoubleClick={onOpen}
		>
			<img src={src} className="w-10 h-10 object-contain" />
			<span className="text-xs text-center bg-black/40 px-1 rounded">
				{label}
			</span>
		</button>
	);
}
