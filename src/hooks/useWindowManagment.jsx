// src/hooks/useWindowManagement.js
import { useState } from "react";

// Define the static list of window types available to open
const WINDOW_SPECS = {
	projects: { title: "My Computer" },
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
		setOpenWindows(
			(prev) =>
				prev
					.map((win) => {
						if (win.id === id) {
							return { ...win, z: newZ, minimized: false };
						}
						return win;
					})
					.sort((a, b) => a.z - b.z) // Keep the array sorted by Z-index for reliable rendering order
		);
	};

	/**
	 * Opens a new window or focuses an existing one.
	 * @param {string} id - The unique action ID from the Start Menu.
	 * @param {object} defaultPos - { x, y } coordinates (screen-size dependent).
	 * @param {object} defaultSize - { width, height } dimensions (screen-size dependent).
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
				defaultPos,
				defaultSize,
			};

			setOpenWindows((prev) => [...prev, newWindow]);
		}
	};

	/**
	 * Closes a window and removes it from the state.
	 * @param {string} id - The ID of the window to close.
	 */
	const onClose = (id) => {
		setOpenWindows((prev) => prev.filter((win) => win.id !== id));
	};

	/**
	 * Minimizes a window, hiding it from the desktop but keeping it in the taskbar.
	 * @param {string} id - The ID of the window to minimize.
	 */
	const onMinimize = (id) => {
		setOpenWindows((prev) =>
			prev.map((win) => (win.id === id ? { ...win, minimized: true } : win))
		);
	};

	/**
	 * Toggles a window between focused/restored and minimized states. Used by the taskbar button.
	 * @param {string} id - The ID of the window to toggle.
	 */
	const onToggle = (id) => {
		const targetWin = openWindows.find((win) => win.id === id);

		if (targetWin.minimized) {
			onFocus(id); // Restore and focus
		} else {
			onMinimize(id); // Minimize
		}
	};

	return {
		wins: openWindows,
		onOpen,
		onFocus,
		onClose,
		onMinimize,
		onToggle,
	};
}
