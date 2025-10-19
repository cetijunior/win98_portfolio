// src/components/apps/ProjectDetailApp.jsx
import React from "react";
import { PROJECTS_DATA } from "../data/projects";

const ProjectItem = ({ project, onOpenDetail }) => (
	<div
		className="flex items-center gap-3 p-2 border-b border-gray-200 cursor-pointer transition-colors duration-100 hover:bg-[#000080] hover:text-white"
		onDoubleClick={() => onOpenDetail(project.id)}
	>
		<span className="text-lg">📄</span>
		<div className="flex-1 min-w-0">
			<div className="font-bold truncate">{project.title}</div>
			<div className="text-xs text-gray-700 hover:text-white transition-colors duration-100">
				{project.summary}
			</div>
		</div>
		<div className="text-xs text-right text-gray-600 hover:text-white transition-colors duration-100 flex-shrink-0">
			{project.date}
		</div>
	</div>
);

export default function ProjectDetailApp({ onOpenDetail }) {
	return (
		<div className="h-full flex flex-col p-1">
			{/* Toolbar/Path Bar */}
			<div className="flex items-center gap-2 p-1 bg-[#dfdfdf] border-2 border-r-[#808080] border-b-[#808080] border-l-white border-t-white text-xs flex-shrink-0 mb-1">
				<span className="font-bold">Address:</span>
				<span className="flex-1 text-blue-800 underline">
					My Computer \ Projects
				</span>
			</div>

			{/* Header */}
			<div className="px-2 py-1 bg-[#c0c0c0] border-b border-[#808080] text-sm font-semibold">
				File | Edit | View
			</div>

			{/* Content Area */}
			<div className="flex-1 overflow-y-auto bg-white border-2 border-r-[#808080] border-b-[#808080] border-l-white border-t-white p-1">
				{PROJECTS_DATA.map((project) => (
					<ProjectItem
						key={project.id}
						project={project}
						onOpenDetail={onOpenDetail}
					/>
				))}
			</div>

			{/* Status Bar */}
			<div className="text-xs p-1 mt-1 border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white bg-[#c0c0c0] flex-shrink-0">
				{PROJECTS_DATA.length} projects found. Double-click to view.
			</div>
		</div>
	);
}
