// src/components/apps/AboutApp.jsx
import React from "react";
import resumeData from "../data/resume";

const FrameBox = ({ title, children }) => (
	<div className="p-3 bg-[#c0c0c0] border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white shadow-inner mb-2">
		<h4 className="font-bold text-sm mb-1">{title}</h4>
		{children}
	</div>
);

export default function AboutApp() {
	return (
		<div className="h-full flex flex-col p-4 gap-4 overflow-y-auto">
			{/* Header / Logo Section */}
			<div className="flex items-start gap-4 p-4 border-2 border-l-white border-t-white border-r-[#808080] border-b-[#808080] bg-[#dfdfdf]">
				{/* Placeholder Image */}
				<img
					src="/icons/98pfp.jpg"
					alt="Profile"
					className="w-16 h-16 bg-blue-700 flex items-center justify-center text-white text-3xl flex-shrink-0 border-2 border-r-[#808080] border-b-[#808080] border-l-white border-t-white"
				/>
				<div>
					<h3 className="text-xl font-extrabold text-[#000080]">
						{resumeData.name}
					</h3>
					<p className="text-sm font-semibold">{resumeData.title}</p>
					<p className="text-xs text-gray-600 mt-1">
						Version 1.0 (Retro OS Build)
					</p>
				</div>
			</div>

			{/* Summary Frame */}
			<FrameBox title="Summary">
				<p className="text-sm">{resumeData.summary}</p>
			</FrameBox>

			{/* Languages Frame */}
			<FrameBox title="Language Proficiency">
				<ul className="list-disc ml-4 text-sm">
					{resumeData.languages.map((lang, index) => (
						<li key={index}>{lang}</li>
					))}
				</ul>
			</FrameBox>

			{/* Contact Button */}
			<div className="flex justify-end mt-auto">
				<a
					href={`mailto:${resumeData.email}`}
					className="px-4 py-1 text-sm font-bold text-black border-2 border-l-white border-t-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] hover:bg-[#dfdfdf] transition-colors"
				>
					Contact Me
				</a>
			</div>
		</div>
	);
}
