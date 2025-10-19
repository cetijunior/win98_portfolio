// src/components/apps/DocumentsApp.jsx
import React from "react";
import resumeData from "../data/resume";

const ResumeSection = ({ title, children }) => (
	<div className="mb-4">
		<h3 className="text-sm font-extrabold border-b-2 border-black mb-1">
			{title}
		</h3>
		{children}
	</div>
);

export default function DocumentsApp() {
	return (
		<div className="h-full flex flex-col">
			{/* Content Area */}
			<div className="flex-1 overflow-y-auto p-4 font-serif text-sm leading-relaxed text-black">
				{/* Header/Contact Info */}
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold">{resumeData.name}</h1>
					<h2 className="text-xl font-semibold mb-2">{resumeData.title}</h2>
					<p className="text-xs">
						{resumeData.location} | {resumeData.phone} | {resumeData.email}
					</p>
				</div>

				{/* Links Section */}
				<ResumeSection title="LINKS">
					<div className="flex flex-wrap gap-x-4 text-xs">
						{resumeData.links.map((link, index) => (
							<a
								key={index}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-700 hover:text-blue-900 underline"
							>
								{link.label}
							</a>
						))}
					</div>
				</ResumeSection>

				{/* Summary Section */}
				<ResumeSection title="SUMMARY">
					<p>{resumeData.summary}</p>
				</ResumeSection>

				{/* Education Section */}
				<ResumeSection title="EDUCATION">
					{resumeData.education.map((item, index) => (
						<div key={index} className="mb-2">
							<div className="font-bold text-sm">{item.school}</div>
							<div className="text-xs italic">{item.period}</div>
							<ul className="list-disc ml-4 mt-1 text-xs">
								{item.bullets.map((bullet, i) => (
									<li key={i}>{bullet}</li>
								))}
							</ul>
						</div>
					))}
				</ResumeSection>
			</div>

			{/* Status Bar - Simple line to indicate document is loaded */}
			<div className="text-xs p-1 border-t border-[#808080] flex-shrink-0 bg-[#c0c0c0]">
				Document Loaded: {resumeData.name} Resume.
			</div>
		</div>
	);
}
