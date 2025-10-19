import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../pdf/ResumePDF.jsx";
import resume from "../data/resume.js";

export default function ResumeWindow() {
	// FIX: Restructure the data to create a flat array of skills
	// for the ResumePDF component, which seems to expect a single skills array.
	const skillsArray = [
		...(resume.skills.programming || []),
		...(resume.skills.frameworks || []),
		...(resume.skills.tools || []),
		...(resume.skills.soft || []),
		...(resume.skills.interests || []),
	];

	// Create a new data object for the PDF generator that includes the flattened skills
	const pdfData = {
		...resume,
		skills: skillsArray, // Overwrite the nested skills object with the flattened array
		// We include a check here, just in case the original ResumePDF still needs the language array
		languages: Array.isArray(resume.languages) ? resume.languages : [],
	};

	return (
		<div className="space-y-3 text-sm">
			<div className="flex items-center gap-2">
				<img src="/icons/documents.png" className="w-6 h-6" alt="" />
				<h3 className="font-bold">Résumé — {resume.name}</h3>
			</div>

			{/* Header */}
			<div className="grid md:grid-cols-2 gap-2">
				<div>
					<div className="font-semibold">{resume.title}</div>
					<div className="text-slate-600">{resume.location}</div>
				</div>
				<div className="md:text-right">
					<div>{resume.phone}</div>
					<div>
						<a className="underline" href={`mailto:${resume.email}`}>
							{resume.email}
						</a>
					</div>
					<div className="flex md:justify-end gap-2 flex-wrap">
						{resume.links.map((l) => (
							<a
								key={l.url}
								className="underline"
								href={l.url}
								target="_blank"
								rel="noreferrer"
							>
								{l.label}
							</a>
						))}
					</div>
				</div>
			</div>

			{/* Summary */}
			<div>
				<h4 className="font-semibold">Summary</h4>
				<p className="mt-1">{resume.summary}</p>
			</div>

			{/* Experience */}
			<div>
				<h4 className="font-semibold">Experience</h4>
				<div className="mt-1 space-y-2">
					{resume.experience.map((e, i) => (
						<div key={i}>
							<div className="font-medium">{e.company}</div>
							<div className="text-slate-700">
								{e.role} — {e.period}
							</div>
							{e.bullets && (
								<ul className="list-disc ml-5 mt-1">
									{e.bullets.map((b, j) => (
										<li key={j}>{b}</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Education */}
			<div>
				<h4 className="font-semibold">Education</h4>
				<div className="mt-1 space-y-2">
					{resume.education.map((ed, i) => (
						<div key={i}>
							<div className="font-medium">{ed.school}</div>
							<div className="text-slate-700">{ed.period}</div>
							{ed.bullets && (
								<ul className="list-disc ml-5 mt-1">
									{ed.bullets.map((b, j) => (
										<li key={j}>{b}</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Skills (Rendered in the HTML window, uses the nested structure) */}
			<div className="grid md:grid-cols-2 gap-2">
				<div>
					<h4 className="font-semibold">Skills</h4>
					<ul className="list-disc ml-5 mt-1">
						<li>
							<b>Programming:</b> {resume.skills.programming.join(", ")}
						</li>
						<li>
							<b>Frameworks:</b> {resume.skills.frameworks.join(", ")}
						</li>
						<li>
							<b>Tools:</b> {resume.skills.tools.join(", ")}
						</li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold">Languages & Interests</h4>
					<ul className="list-disc ml-5 mt-1">
						<li>
							<b>Languages:</b> {resume.languages.join(", ")}
						</li>
						<li>
							<b>Soft skills:</b> {resume.skills.soft.join(", ")}
						</li>
						<li>
							<b>Interests:</b> {resume.skills.interests.join(", ")}
						</li>
					</ul>
				</div>
			</div>

			{/* Downloads */}
			<div className="flex items-center gap-2 pt-2">
				<a href="/resume.pdf" download className="button">
					Download /public/resume.pdf
				</a>
				<PDFDownloadLink
					// PASS THE NEW, RESTRUCTURED DATA OBJECT HERE
					document={<ResumePDF data={pdfData} />}
					fileName="resume-print.pdf"
				>
					{({ loading }) => (
						<button className="button">
							{loading ? "Preparing…" : "Generate Print PDF"}
						</button>
					)}
				</PDFDownloadLink>
			</div>
		</div>
	);
}
