// src/components/apps/MyComputerApp.jsx
import React from "react";

const DirectoryItem = ({ title, icon }) => (
	<div className="flex flex-col items-center w-24 p-2 cursor-pointer transition-all duration-100 active:bg-blue-300">
		<img src={icon} alt={title} className="w-10 h-10 mb-1" />
		<span className="text-xs text-black text-center select-none">{title}</span>
	</div>
);

export default function MyComputerApp() {
	return (
		<div className="h-full w-full flex flex-col p-2 bg-[#c0c0c0] font-sans text-sm overflow-y-auto">
			{/* Toolbar */}
			<div className="flex items-center p-1 border-b border-t border-[#dfdfdf] border-r border-l border-t-white border-l-white border-b-[#808080] border-r-[#808080] mb-2 shadow-inner">
				<span className="text-xs font-bold text-gray-700">
					File Edit View Help
				</span>
			</div>
			{/* Address Bar Placeholder */}
			<div className="mb-3">
				<label className="block text-xs text-gray-700 mb-1">Address:</label>
				<input
					type="text"
					value="My Computer"
					readOnly
					className="w-full text-xs p-1 border border-black shadow-inner bg-white"
				/>
			</div>
			{/* Drives/Directories Grid */}
			<div className="grid grid-cols-3 gap-4 p-2">
				<DirectoryItem title="Floppy (A:)" icon="/icons/floppy.png" />
				<DirectoryItem title="Local Disk (C:)" icon="/icons/local.png" />
				<DirectoryItem title="CD-ROM (D:)" icon="/icons/my-computer.png" />
				<DirectoryItem title="Control Panel" icon="/icons/control.png" />
				<DirectoryItem title="Printer" icon="/icons/printer.png" />
				<DirectoryItem title="Network" icon="/icons/network.png" />
			</div>
			<div className="mt-auto h-8 flex-shrink-0"></div>{" "}
			{/* Spacer for bottom padding */}
		</div>
	);
}
