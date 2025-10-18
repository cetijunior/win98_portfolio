import React, { useState, useEffect } from "react";
import Win95OS from "./Win95OS.jsx";

// SVG Components for desk props
const CoffeeMug = () => (
	<svg viewBox="0 0 150 180" className="w-full h-full">
		{/* Mug body */}
		<rect x="30" y="40" width="90" height="90" fill="#8b7355" rx="4" />

		{/* Coffee inside */}
		<rect x="35" y="50" width="80" height="75" fill="#3d2817" rx="2" />

		{/* Coffee foam/crema */}
		<ellipse cx="75" cy="50" rx="42" ry="10" fill="#5a4a3a" />

		{/* Mug rim */}
		<ellipse cx="75" cy="40" rx="50" ry="12" fill="#a0826d" />
		<ellipse cx="75" cy="38" rx="48" ry="10" fill="#b8988f" />

		{/* Handle */}
		<path
			d="M 120 60 Q 150 70 145 100"
			stroke="#8b7355"
			strokeWidth="14"
			fill="none"
			strokeLinecap="round"
		/>
		<path
			d="M 120 60 Q 145 68 142 100"
			stroke="#a0826d"
			strokeWidth="10"
			fill="none"
			strokeLinecap="round"
		/>

		{/* Highlight on mug */}
		<ellipse cx="45" cy="60" rx="8" ry="20" fill="rgba(255,255,255,0.1)" />

		{/* Steam wisps */}
		<path
			d="M 60 30 Q 55 15 60 5"
			stroke="#ddd"
			strokeWidth="2"
			fill="none"
			opacity="0.6"
			strokeLinecap="round"
		/>
		<path
			d="M 90 25 Q 95 10 90 0"
			stroke="#ddd"
			strokeWidth="2"
			fill="none"
			opacity="0.6"
			strokeLinecap="round"
		/>
	</svg>
);

const Keyboard = () => (
	<svg viewBox="0 0 600 200" className="w-full h-full">
		{/* Main body */}
		<rect x="30" y="20" width="540" height="150" fill="#a8a89c" rx="8" />

		{/* Top bezel */}
		<rect x="30" y="20" width="540" height="20" fill="#c0c0c0" rx="8" />

		{/* Keys area background */}
		<rect x="45" y="45" width="510" height="110" fill="#8b8b7f" rx="4" />

		{/* Key rows */}
		<g>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
				<rect
					key={`r1-${i}`}
					x={50 + i * 38}
					y={50}
					width="32"
					height="16"
					fill="#d0c8b0"
					stroke="#707068"
					strokeWidth="1"
					rx="2"
				/>
			))}
		</g>

		<g>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
				<rect
					key={`r2-${i}`}
					x={55 + i * 38}
					y={70}
					width="32"
					height="16"
					fill="#d0c8b0"
					stroke="#707068"
					strokeWidth="1"
					rx="2"
				/>
			))}
		</g>

		<g>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
				<rect
					key={`r3-${i}`}
					x={65 + i * 38}
					y={90}
					width="32"
					height="16"
					fill="#d0c8b0"
					stroke="#707068"
					strokeWidth="1"
					rx="2"
				/>
			))}
		</g>

		{/* Space bar */}
		<rect
			x="60"
			y="110"
			width="260"
			height="16"
			fill="#d0c8b0"
			stroke="#707068"
			strokeWidth="1"
			rx="2"
		/>
		<rect
			x="330"
			y="110"
			width="32"
			height="16"
			fill="#d0c8b0"
			stroke="#707068"
			strokeWidth="1"
			rx="2"
		/>
		<rect
			x="370"
			y="110"
			width="32"
			height="16"
			fill="#d0c8b0"
			stroke="#707068"
			strokeWidth="1"
			rx="2"
		/>

		{/* Cable */}
		<path
			d="M 300 20 Q 320 -10 340 -30"
			stroke="#333"
			strokeWidth="12"
			fill="none"
			strokeLinecap="round"
		/>
	</svg>
);

const Mouse = () => (
	<svg viewBox="0 0 200 280" className="w-full h-full">
		{/* Mouse body */}
		<ellipse cx="100" cy="80" rx="50" ry="70" fill="#d0c8b0" />

		{/* Mouse top highlight */}
		<ellipse cx="100" cy="50" rx="40" ry="30" fill="#e8dfc7" opacity="0.6" />

		{/* Click buttons divider */}
		<path d="M 100 50 L 100 130" stroke="#999" strokeWidth="2" />

		{/* Mouse scroll wheel */}
		<circle cx="100" cy="75" r="12" fill="#888" />
		<circle cx="100" cy="75" r="10" fill="#aaa" />

		{/* Mouse pad */}
		<rect x="30" y="130" width="140" height="100" fill="#c9a080" rx="8" />
		<rect
			x="30"
			y="130"
			width="140"
			height="100"
			fill="url(#pad-texture)"
			rx="8"
			opacity="0.5"
		/>

		{/* Cable coil */}
		<path
			d="M 100 200 Q 110 220 105 240"
			stroke="#333"
			strokeWidth="8"
			fill="none"
			strokeLinecap="round"
		/>
		<circle cx="105" cy="245" r="12" fill="#444" />

		{/* Texture defs */}
		<defs>
			<pattern
				id="pad-texture"
				patternUnits="userSpaceOnUse"
				width="4"
				height="4"
			>
				<circle cx="2" cy="2" r="1" fill="#888" opacity="0.3" />
			</pattern>
		</defs>
	</svg>
);

const Books = () => (
	<svg viewBox="0 0 250 200" className="w-full h-full">
		{/* Back book - red */}
		<rect x="20" y="80" width="50" height="100" fill="#c41e3a" rx="3" />
		<rect x="20" y="80" width="50" height="6" fill="#a01830" />
		<text
			x="35"
			y="140"
			fontSize="8"
			fill="#fff"
			fontWeight="bold"
			textAnchor="middle"
		>
			CODE
		</text>

		{/* Middle book - blue */}
		<rect
			x="60"
			y="50"
			width="50"
			height="130"
			fill="#1e90ff"
			rx="3"
			transform="rotate(-8 85 50)"
		/>
		<rect
			x="60"
			y="50"
			width="50"
			height="6"
			fill="#0066cc"
			transform="rotate(-8 85 50)"
		/>

		{/* Front book - dark */}
		<rect x="100" y="70" width="50" height="110" fill="#333" rx="3" />
		<rect x="100" y="70" width="50" height="8" fill="#222" />
		<text
			x="115"
			y="135"
			fontSize="7"
			fill="#fff"
			fontWeight="bold"
			textAnchor="middle"
		>
			JS
		</text>

		{/* Right book - green */}
		<rect
			x="140"
			y="60"
			width="45"
			height="120"
			fill="#228b22"
			rx="3"
			transform="rotate(12 162 60)"
		/>
		<rect
			x="140"
			y="60"
			width="45"
			height="6"
			fill="#1a6b1a"
			transform="rotate(12 162 60)"
		/>

		{/* Bookmark on back book */}
		<rect x="25" y="60" width="8" height="30" fill="#ffd700" />
	</svg>
);

export default function DeskScene() {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 5;
			const y = (e.clientY / window.innerHeight - 0.5) * 5;
			setMousePos({ x, y });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="relative w-full h-screen overflow-hidden bg-slate-900">
			{/* Background vignette gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900" />

			{/* Animated background particles */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-white rounded-full opacity-5"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animation: `float ${8 + i * 2}s infinite ease-in-out`,
						}}
					/>
				))}
			</div>

			{/* Main content container */}
			<div className="relative w-full h-full flex items-center justify-center">
				{/* CRT Monitor with 3D perspective */}
				<div
					className="relative"
					style={{
						width: "92vw",
						maxWidth: "1100px",
						aspectRatio: "16 / 10",
						transform: `perspective(1500px) rotateX(${
							mousePos.y * 0.2
						}deg) rotateY(${mousePos.x * 0.2}deg) translateZ(50px)`,
						transition: "transform 0.1s ease-out",
					}}
				>
					{/* CRT Bezel - Cream colored like classic monitor */}
					<div
						className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 rounded-3xl shadow-2xl p-6 md:p-8"
						style={{
							boxShadow:
								"0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset -2px -2px 5px rgba(0,0,0,0.1)",
						}}
					>
						{/* Top bezel detail */}
						<div className="absolute top-4 left-6 right-6 h-4 bg-gradient-to-b from-zinc-200 to-zinc-300 rounded opacity-50" />

						{/* Vents */}
						<div className="absolute top-1/3 left-4 flex flex-col gap-2">
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className="w-2 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-sm opacity-60"
								/>
							))}
						</div>

						{/* Screen area with OS inside */}
						<div
							className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-inner border-4 border-gray-800"
							style={{
								boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)",
							}}
						>
							{/* Windows 95 OS */}
							<Win95OS />

							{/* Scan line effect overlay */}
							<div
								className="absolute inset-0 pointer-events-none"
								style={{
									backgroundImage:
										"repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
									zIndex: 10,
								}}
							/>
						</div>

						{/* Bottom bezel with status bar appearance */}
						<div
							className="absolute bottom-4 left-6 right-6 h-5 bg-gradient-to-b from-zinc-200 to-zinc-400 rounded flex items-center px-4 text-xs font-bold text-gray-700"
							style={{
								boxShadow:
									"inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.2)",
							}}
						>
							<div className="w-2 h-2 rounded-full bg-red-500 opacity-80" />
							<span className="ml-2">Ready</span>
						</div>
					</div>
				</div>
			</div>

			{/* Desk surface */}
			<div className="hidden absolute bottom-0 left-0 right-0 h-40 md:h-56 bg-gradient-to-b from-slate-700/60 to-slate-900/80 backdrop-blur-sm border-t border-slate-600/50" />

			{/* Desk props - positioned around the monitor */}
			<div className="hidden absolute inset-0 pointer-events-none">
				{/* Coffee mug - left side */}
				<div className="hidden md:block absolute bottom-32 left-8 w-20 h-28 opacity-90 hover:opacity-100 transition-opacity">
					<CoffeeMug />
				</div>

				{/* Keyboard - bottom left */}
				<div className="hidden md:block absolute bottom-16 left-20 w-72 h-24 opacity-90 hover:opacity-100 transition-opacity">
					<Keyboard />
				</div>

				{/* Mouse - bottom right */}
				<div className="hidden md:block absolute bottom-20 right-32 w-20 h-32 opacity-90 hover:opacity-100 transition-opacity">
					<Mouse />
				</div>

				{/* Books - right side */}
				<div className="hidden md:block absolute bottom-32 right-8 w-48 h-28 opacity-90 hover:opacity-100 transition-opacity">
					<Books />
				</div>
			</div>

			{/* Floating animation keyframes */}
			<style>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-15px); }
				}
			`}</style>
		</div>
	);
}
