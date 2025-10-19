import React, { useState, useCallback } from "react";
import { Rnd } from "react-rnd";
// 🚀 FIX: Changed to Default Import (removed curly braces)
import useScreenType from "../../hooks/useScreenType";

// Helper function for the Rnd component's Maximize state (Desktop)
const MAXIMIZED_SIZE = {
	x: 0,
	y: 0,
	width: "100vw", // Use viewport width for full screen
	height: "calc(100vh - 48px)", // Subtract taskbar height (48px)
};

// Helper for Mobile Max
const MOBILE_MAX_SIZE = {
	x: 0,
	y: 0,
	width: "100vw",
	height: "100vh",
};

export default function WindowFrame({
	spec,
	containerQuery,
	onFocus,
	onClose,
	onMinimize,
	onDragResizeStop, // <-- Must be passed down from parent (DesktopExperience)
	children,
}) {
	// 1. ALL HOOKS MUST BE DECLARED UNCONDITIONALLY AT THE TOP LEVEL

	// 🚀 HOOK CHANGE: Use useScreenType to detect environment
	// Destructuring `isMobile` is still correct for a hook that returns an object.
	const { isMobile } = useScreenType();
	const [isMaximizedLocal, setIsMaximizedLocal] = useState(false);

	// 🛑 REMOVED: [lastPosition, setLastPosition] state and useEffect.
	// State is now managed by the central useWindowManagement hook.

	// --- CALCULATIONS ---
	const isForcedMaximized = spec?.isMaximized === true;
	const currentMaxState = isForcedMaximized || isMaximizedLocal;

	// Use the position/size from the centralized state (spec)
	// Use fallback defaults if position/size are somehow missing
	const currentDesktopPos = spec?.position || { x: 80, y: 60 };
	const currentDesktopSize = spec?.size || { width: 620, height: 420 };

	// Determine Rnd props based on state and environment
	let currentProps;

	if (isMobile) {
		// 🚀 FIX 2 (Mobile): Always full screen, non-resizable/draggable
		currentProps = {
			x: MOBILE_MAX_SIZE.x,
			y: MOBILE_MAX_SIZE.y,
			width: MOBILE_MAX_SIZE.width,
			height: MOBILE_MAX_SIZE.height,
			disableDragging: true,
			enableResizing: false,
		};
	} else if (currentMaxState) {
		// DESKTOP MAXIMIZED
		currentProps = {
			x: MAXIMIZED_SIZE.x,
			y: MAXIMIZED_SIZE.y,
			width: MAXIMIZED_SIZE.width,
			height: MAXIMIZED_SIZE.height,
			disableDragging: true,
			enableResizing: false,
		};
	} else {
		// 🚀 FIX 1 (Desktop Position): Use centralized state for position/size
		currentProps = {
			x: currentDesktopPos.x,
			y: currentDesktopPos.y,
			width: currentDesktopSize.width,
			height: currentDesktopSize.height,
			disableDragging: false,
			enableResizing: true,
		};
	}

	// Handle Maximize Toggle
	const handleMaximizeToggle = useCallback(() => {
		if (isForcedMaximized || isMobile) return;

		// Note: The original window's dimensions are already saved in the central state
		// before maximizing, so we only need to toggle the local state here.
		setIsMaximizedLocal((prev) => !prev);
	}, [isForcedMaximized, isMobile]);

	// 🛑 CONDITIONAL RETURNS LAST 🛑
	if (!spec || spec.minimized) {
		return null;
	}

	// --- RENDER ---

	return (
		<Rnd
			// Rnd Props based on calculated currentProps
			bounds={containerQuery}
			size={{ width: currentProps.width, height: currentProps.height }}
			position={{ x: currentProps.x, y: currentProps.y }}
			disableDragging={currentProps.disableDragging}
			enableResizing={currentProps.enableResizing}
			// 🚀 FIX 1: Send the new position back to the central hook
			onDragStop={(e, data) => {
				if (!currentMaxState && !isMobile) {
					onDragResizeStop(spec.id, { x: data.x, y: data.y });
				}
			}}
			// 🚀 FIX 1: Send the new size and position back to the central hook
			onResizeStop={(e, direction, ref, delta, position) => {
				if (!currentMaxState && !isMobile) {
					onDragResizeStop(
						spec.id,
						position, // new position
						{ width: ref.style.width, height: ref.style.height } // new size
					);
				}
			}}
			minWidth={360}
			minHeight={220}
			dragHandleClassName="title-bar"
			className={`absolute ${
				currentMaxState && !isMobile ? "w-screen h-[calc(100vh-48px)]" : ""
			} ${isMobile ? "rounded-none" : ""}`}
			style={{ zIndex: spec.z }}
			onDragStart={() => onFocus(spec.id)}
			onResizeStart={() => onFocus(spec.id)}
		>
			<div
				className={`h-full flex flex-col border-2 ${
					isMobile ? "rounded-none" : ""
				}`}
				style={{
					borderStyle: "ridge",
					borderColor: "#dfdfdf #808080 #808080 #dfdfdf",
					boxShadow: "0 0 0 1px #ffffff inset, 0 0 0 1px #808080",
					background: isMobile
						? "#c0c0c0"
						: "linear-gradient(to bottom, #dfdfdf, #808080)",
				}}
				onMouseDown={() => onFocus(spec.id)}
			>
				{/* Title Bar */}
				<div
					className="title-bar flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#000080] to-[#1084d7] text-white select-none cursor-move flex-shrink-0"
					onDoubleClick={() => !isMobile && handleMaximizeToggle()}
					style={{
						backgroundImage: "linear-gradient(90deg, #000080 0%, #1084d7 100%)",
						boxShadow:
							"inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.3)",
					}}
				>
					<div className="flex items-center gap-2 min-w-0">
						<span className="text-xs font-bold leading-none truncate">
							{spec.title}
						</span>
					</div>

					{/* Control buttons */}
					<div className="flex gap-1 items-center flex-shrink-0">
						{/* Minimize */}
						<button
							onMouseDown={(e) => e.stopPropagation()}
							onClick={(e) => {
								e.stopPropagation();
								onMinimize(spec.id);
							}}
							title="Minimize"
						>
							_
						</button>

						{/* Maximize / Restore - Hide on Mobile */}
						{!isForcedMaximized && !isMobile && (
							<button
								onMouseDown={(e) => e.stopPropagation()}
								onClick={(e) => {
									e.stopPropagation();
									handleMaximizeToggle();
								}}
								title={currentMaxState ? "Restore" : "Maximize"}
							>
								{currentMaxState ? "❐" : "□"}
							</button>
						)}

						{/* Close */}
						<button
							onMouseDown={(e) => e.stopPropagation()}
							onClick={(e) => {
								e.stopPropagation();
								onClose(spec.id);
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

				{/* Status Bar - Hide on Mobile */}
				<div
					className={`p-1 border-t-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white text-xs flex-shrink-0 ${
						isMobile ? "hidden" : "flex items-center justify-between"
					}`}
				>
					<div className="text-gray-700">Ready</div>
					<div className="text-gray-700 border-l-2 border-l-white border-t-white border-r-[#808080] border-b-[#808080] px-2 ml-1"></div>
				</div>
			</div>
		</Rnd>
	);
}
