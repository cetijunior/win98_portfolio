// src/components/apps/DocumentsApp.jsx
import React from "react";

const DocumentRow = ({ title, icon, size }) => (
	<div className="flex items-center p-2 border-b border-[#dfdfdf] hover:bg-[#000080] hover:text-white cursor-pointer transition-colors duration-75">
		<img src={icon} alt={title} className="w-6 h-6 mr-3" />
		<div className="flex-1 min-w-0 truncate">
			<span className="text-sm font-medium">{title}</span>
		</div>
		<span className="text-xs text-right w-16 flex-shrink-0">{size}</span>
	</div>
);

export default function DocumentsApp() {
	return (
		<div className="h-full w-full flex flex-col bg-white font-sans text-sm overflow-y-auto">
			{/* Header/Column Titles */}
			<div className="flex p-2 bg-[#c0c0c0] border-b border-t border-[#dfdfdf] border-r border-l border-t-white border-l-white border-b-[#808080] border-r-[#808080] sticky top-0 z-10 text-xs text-gray-700">
				<span className="flex-1 ml-9 font-bold">Name</span>
				<span className="text-right w-16 flex-shrink-0 font-bold">Size</span>
			</div>

			{/* Document List */}
			<div className="flex-1 bg-white">
				<DocumentRow
					title="Resume_2025.doc"
					icon="/icons/documents.png"
					size="52 KB"
				/>
				<DocumentRow
					title="Skills_List.txt"
					icon="/icons/icon.png"
					size="8 KB"
				/>
				<DocumentRow
					title="Portfolio_Photos"
					icon="/icons/projects.png"
					size="-"
				/>
				<DocumentRow title="README.md" icon="/icons/icon.png" size="10 KB" />
				<DocumentRow
					title="OldProjects.zip"
					icon="/icons/documents.png"
					size="2.1 MB"
				/>
				{/* Filler for scrolling on small screens */}
				{Array(10)
					.fill()
					.map((_, i) => (
						<div key={i} className="h-10 border-b border-gray-100"></div>
					))}
			</div>
		</div>
	);
}
