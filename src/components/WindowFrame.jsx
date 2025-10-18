import React, { useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";

// ============================================
// WINDOW FRAME COMPONENT
// ============================================
export default function WindowFrame({
	spec,
	containerQuery,
	onFocus,
	onClose,
	onMinimize,
	children,
}) {
	const [isMaximized, setIsMaximized] = useState(false);

	if (spec.minimized) return null;

	const defaultSize = spec.defaultSize;
	const defaultPos = spec.defaultPos;

	return (
		<Rnd
			bounds={containerQuery}
			default={{
				x: typeof defaultPos.x === "number" ? defaultPos.x : 80,
				y: typeof defaultPos.y === "number" ? defaultPos.y : 60,
				width: typeof defaultSize.width === "number" ? defaultSize.width : 620,
				height:
					typeof defaultSize.height === "number" ? defaultSize.height : 420,
			}}
			minWidth={360}
			minHeight={220}
			dragHandleClassName="title-bar"
			className="absolute"
			style={{ zIndex: spec.z }}
			onDragStart={onFocus}
			onResizeStart={onFocus}
		>
			<div
				className="h-full flex flex-col bg-gradient-to-b from-[#dfdfdf] to-[#808080] border-2"
				style={{
					borderStyle: "ridge",
					borderColor: "#dfdfdf #808080 #808080 #dfdfdf",
					boxShadow: "0 0 0 1px #ffffff inset, 0 0 0 1px #808080",
				}}
				onMouseDown={onFocus}
			>
				{/* Title Bar */}
				<div
					className="title-bar flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#000080] to-[#1084d7] text-white select-none cursor-move flex-shrink-0"
					style={{
						backgroundImage: "linear-gradient(90deg, #000080 0%, #1084d7 100%)",
						boxShadow:
							"inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.3)",
					}}
				>
					{/* Title */}
					<div className="flex items-center gap-2 min-w-0">
						<span className="text-xs font-bold leading-none truncate">
							{spec.title}
						</span>
					</div>

					{/* Control buttons */}
					<div className="flex gap-1 items-center flex-shrink-0">
						{/* Minimize */}
						<button
							className="w-6 h-6 flex items-center justify-center text-white hover:bg-black/20 active:bg-black/40 transition-colors font-bold text-sm"
							style={{
								border: "1px solid #dfdfdf",
								boxShadow:
									"inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.5)",
							}}
							onMouseDown={(e) => e.stopPropagation()}
							onClick={(e) => {
								e.stopPropagation();
								onMinimize();
							}}
							title="Minimize"
						>
							_
						</button>

						{/* Maximize */}
						<button
							className="w-6 h-6 flex items-center justify-center text-white hover:bg-black/20 active:bg-black/40 transition-colors font-bold"
							style={{
								border: "1px solid #dfdfdf",
								boxShadow:
									"inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.5)",
							}}
							onMouseDown={(e) => e.stopPropagation()}
							onClick={(e) => {
								e.stopPropagation();
								setIsMaximized(!isMaximized);
							}}
							title="Maximize"
						>
							□
						</button>

						{/* Close */}
						<button
							className="w-6 h-6 flex items-center justify-center text-white hover:bg-red-700/80 active:bg-red-900/80 transition-colors font-bold"
							style={{
								border: "1px solid #dfdfdf",
								boxShadow:
									"inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.5)",
							}}
							onMouseDown={(e) => e.stopPropagation()}
							onClick={(e) => {
								e.stopPropagation();
								onClose();
							}}
							title="Close"
						>
							×
						</button>
					</div>
				</div>

				{/* Window Body */}
				<div
					className="flex-1 bg-[#c0c0c0] overflow-auto"
					style={{
						backgroundImage:
							"repeating-linear-gradient(90deg, #c0c0c0 0px, #c0c0c0 2px, #dfdfdf 2px, #dfdfdf 4px)",
						boxShadow:
							"inset 1px 1px 0 rgba(255,255,255,0.8), inset -1px -1px 0 rgba(128,128,128,0.8)",
					}}
				>
					<div className="p-3 h-full">{children}</div>
				</div>

				{/* Status Bar */}
				<div
					className="h-4 flex items-end px-1 py-0.5 bg-gradient-to-b from-[#dfdfdf] to-[#808080] flex-shrink-0"
					style={{
						borderTop: "1px solid #dfdfdf",
					}}
				>
					<div className="text-xs text-gray-700">Ready</div>
					<div
						className="ml-auto w-3 h-3 bg-gradient-to-tl from-[#808080] to-[#dfdfdf]"
						style={{
							border: "1px solid #dfdfdf",
							boxShadow: "inset 1px 1px 0 rgba(0,0,0,0.5)",
						}}
					></div>
				</div>
			</div>
		</Rnd>
	);
}
