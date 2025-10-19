// src/hooks/useWindowManagement.js
import { useState } from "react";

// Define the static list of window types available to open
// NOTE: I've added 'projects-list' here so it can be managed by the hook
const WINDOW_SPECS = {
	projects: { title: "My Computer" },
	"projects-list": { title: "Projects" }, // Added new window type
	resume: { title: "Documents" },
	skills: { title: "Skills Terminal" },
	about: { title: "About Me" },
};

export default function useWindowManagement() {
	const [openWindows, setOpenWindows] = useState([]);
	const [maxZIndex, setMaxZIndex] = useState(1);

	/**
	 * Finds the next available Z-index and increments the counter.
	 * @returns {number} The new highest Z-index.
	 */
	const getNextZIndex = () => {
		const newZ = maxZIndex + 1;
		setMaxZIndex(newZ);
		return newZ;
	};

	/**
	 * Brings a window to the front (highest Z-index) and ensures it's not minimized.
	 * @param {string} id - The ID of the window to focus.
	 */
	const onFocus = (id) => {
		const newZ = getNextZIndex();
		setOpenWindows((prev) =>
			prev.map((win) => {
				if (win.id === id) {
					// Update Z-index and ensure it's not minimized
					return { ...win, z: newZ, minimized: false };
				}
				return win;
			})
		);
	};

	/**
	 * Opens a new window or focuses an existing one.
	 */
	const onOpen = (id, defaultPos, defaultSize) => {
		const spec = WINDOW_SPECS[id];
		if (!spec) return;

		const existingWin = openWindows.find((win) => win.id === id);

		if (existingWin) {
			onFocus(id); // If exists, bring to front
		} else {
			const newZ = getNextZIndex();
			const newWindow = {
				id,
				title: spec.title,
				z: newZ,
				minimized: false,
				// 🚀 NEW: Store the initial position/size directly in the window state
				position: defaultPos,
				size: defaultSize,
			};

			setOpenWindows((prev) => [...prev, newWindow]);
		}
	};

	/**
	 * 🚀 NEW: Updates the window's position or size after a drag or resize operation.
	 * This moves the position state logic from WindowFrame to the centralized hook.
	 */
	const onDragResizeStop = (id, newPosition, newSize) => {
		setOpenWindows((prev) =>
			prev.map((win) => {
				if (win.id === id) {
					return {
						...win,
						// Update position and size based on what's provided
						position: newPosition || win.position,
						size: newSize || win.size,
					};
				}
				return win;
			})
		);
	};

	/**
	 * Closes a window and removes it from the state.
	 */
	const onClose = (id) => {
		setOpenWindows((prev) => prev.filter((win) => win.id !== id));
	};

	/**
	 * Minimizes a window, hiding it from the desktop but keeping it in the taskbar.
	 */
	const onMinimize = (id) => {
		setOpenWindows((prev) =>
			prev.map((win) => (win.id === id ? { ...win, minimized: true } : win))
		);
	};

	/**
	 * Toggles a window between focused/restored and minimized states. Used by the taskbar button.
	 */
	const onToggle = (id) => {
		setOpenWindows((prev) => {
			const targetWin = prev.find((win) => win.id === id);

			if (!targetWin) return prev;

			if (targetWin.minimized) {
				// Restore and focus (set new Z-index and minimized: false)
				const newZ = getNextZIndex();
				return prev.map((win) =>
					win.id === id ? { ...win, z: newZ, minimized: false } : win
				);
			} else {
				// Minimize
				return prev.map((win) =>
					win.id === id ? { ...win, minimized: true } : win
				);
			}
		});
	};

	return {
		wins: openWindows,
		onOpen,
		onFocus,
		onClose,
		onMinimize,
		onToggle,
		// 🚀 NEW: Export the new update handler
		onDragResizeStop,
	};
}
