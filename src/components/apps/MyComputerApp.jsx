// src/components/apps/MyComputerApp.jsx
import React, { useState, useCallback } from "react";
import fileStructure from "../data/fileStructure";
// import resumeData from "../../data/resume"; // Removed unnecessary import

// ------------------------------------------------------------------
// Sub-Component for displaying a single file or folder
// ------------------------------------------------------------------
const FileItem = ({ item, onDoubleClick }) => {
	const isFolder = item.type === "Folder";
	const icon = item.icon || (isFolder ? "📁" : "📄");

	// Default or calculated size/date
	const size = item.size || (isFolder ? `${item.content.length} items` : "N/A");
	const date = item.date || "N/A";

	return (
		<div
			className="flex items-center gap-2 p-1 pl-2 hover:bg-[#000080] hover:text-white cursor-pointer transition-colors duration-100 border-b border-gray-100 text-sm"
			onDoubleClick={isFolder ? () => onDoubleClick(item) : undefined}
		>
			<span className="text-lg flex-shrink-0">{icon}</span>
			<div className="flex-1 min-w-0">
				<div className="truncate">{item.title}</div>
			</div>
			<div className="hidden sm:block text-xs text-right text-gray-700 hover:text-white transition-colors duration-100 w-20 flex-shrink-0">
				{size}
			</div>
			<div className="hidden sm:block text-xs text-right text-gray-700 hover:text-white transition-colors duration-100 w-20 flex-shrink-0">
				{date}
			</div>
		</div>
	);
};

// ------------------------------------------------------------------
// Main App Component
// ------------------------------------------------------------------
export default function MyComputerApp({ onOpen }) {
	const driveKeys = Object.keys(fileStructure);

	const [activeDrive, setActiveDrive] = useState(driveKeys[0]);
	const [pathStack, setPathStack] = useState([
		{
			title: activeDrive,
			content: fileStructure[activeDrive],
		},
	]);

	const currentFolder = pathStack[pathStack.length - 1];
	const pathString = pathStack.map((p) => p.title.split(" ")[0]).join("\\");

	const handleFolderClick = useCallback(
		(folder) => {
			if (folder.content) {
				setPathStack((prev) => [
					...prev,
					{ title: folder.title, content: folder.content },
				]);
			} else if (
				folder.title.includes("Info") ||
				folder.title.includes("Read Me")
			) {
				// Trigger a new window for the "About" App
				onOpen("about");
			}
		},
		[onOpen]
	);

	const handlePathClick = useCallback(
		(index) => {
			if (index === "back") {
				if (pathStack.length > 1) {
					setPathStack((prev) => prev.slice(0, prev.length - 1));
				}
			} else {
				// New drive selection
				const newDrive = driveKeys[index];
				setActiveDrive(newDrive);
				setPathStack([{ title: newDrive, content: fileStructure[newDrive] }]);
			}
		},
		[pathStack, driveKeys]
	);

	// ------------------------------------------------------------------
	// Render
	// ------------------------------------------------------------------
	return (
		<div className="h-full flex flex-col p-1 text-black">
			{/* Toolbar/Path Bar - Uses classic inset border for a sunk-in look */}
			<div className="flex flex-col gap-1 flex-shrink-0 mb-1">
				<div className="flex items-center gap-1 p-1 bg-[#c0c0c0] border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white text-xs">
					{/* Back Button - Classic Beveled Button Look */}
					<button
						className={`font-bold px-2 py-0.5 border-2 border-l-white border-t-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] active:border-l-[#808080] active:border-t-[#808080] active:border-r-white active:border-b-white ${
							pathStack.length > 1 ? "" : "opacity-50 cursor-not-allowed"
						}`}
						onClick={() => handlePathClick("back")}
						disabled={pathStack.length <= 1}
					>
						&larr; Back
					</button>

					{/* Address Bar - Sunk In Field */}
					<span className="font-bold ml-2">Address:</span>
					<div className="flex-1 border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white bg-white p-[1px] h-6 flex items-center">
						<span className="text-blue-800 truncate px-1 text-sm">
							{pathString}
						</span>
					</div>
				</div>

				{/* Drive Tabs */}
				<div className="flex gap-0.5 text-xs text-gray-800">
					{driveKeys.map((key, index) => (
						<button
							key={key}
							// 🚀 DESIGN FIX: Use specific border properties for the classic tab look
							className={`px-3 py-1 border-x border-t border-b-0 ${
								activeDrive === key
									? "bg-[#c0c0c0] border-l-white border-t-white border-r-[#808080] -mb-px" // Active tab state
									: "bg-[#dfdfdf] border-l-[#dfdfdf] border-t-[#dfdfdf] border-r-[#808080] border-b-[#808080] cursor-pointer" // Inactive tab state
							}`}
							onClick={() => handlePathClick(index)}
						>
							{key}
						</button>
					))}
					{/* Filler to hide tab bottom border */}
					<div className="flex-1 border-b-2 border-[#808080]"></div>
				</div>
			</div>

			{/* Content Area - Sunken look is already great */}
			<div className="flex-1 overflow-y-auto bg-white border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white p-1">
				{/* Header Row */}
				<div className="flex items-center gap-2 p-1 px-2 font-semibold text-gray-700 border-b border-gray-400 text-xs bg-[#dfdfdf] flex-shrink-0">
					<span className="w-6"></span>
					<span className="flex-1">Name</span>
					<span className="hidden sm:block w-20 text-right">Size</span>
					<span className="hidden sm:block w-20 text-right">Date Modified</span>
				</div>

				{/* File/Folder List */}
				{currentFolder.content.map((item, index) => (
					<FileItem key={index} item={item} onDoubleClick={handleFolderClick} />
				))}
			</div>

			{/* Status Bar - Standard 3D Bevel */}
			<div className="text-xs p-1 mt-1 border-2 border-l-white border-t-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] flex-shrink-0">
				{currentFolder.content.length} object(s) found.
			</div>
		</div>
	);
}
