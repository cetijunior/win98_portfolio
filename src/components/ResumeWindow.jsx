import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./pdf/ResumePDF.jsx";
import resume from "./data/resume.js";

export default function ResumeWindow() {
	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<img src="/icons/documents.png" className="w-6 h-6" />
				<h3 className="font-bold">Résumé</h3>
			</div>
			<p className="text-sm">
				Quick view from JSON + downloads below. Replace{" "}
				<code>src/data/resume.js</code> with your data.
			</p>

			<div className="grid grid-cols-2 gap-2 text-sm">
				<div>
					<h4 className="font-semibold">Profile</h4>
					<p>{resume.name}</p>
					<p className="text-slate-600">{resume.title}</p>
					<p className="mt-2 whitespace-pre-wrap">{resume.summary}</p>
				</div>
				<div>
					<h4 className="font-semibold">Skills</h4>
					<ul className="list-disc ml-5">
						{resume.skills.map((s) => (
							<li key={s}>{s}</li>
						))}
					</ul>
				</div>
			</div>

			<div>
				<h4 className="font-semibold">Experience</h4>
				<ul className="list-disc ml-5 text-sm">
					{resume.experience.map((e, i) => (
						<li key={i}>
							<span className="font-medium">{e.company}</span> — {e.role} (
							{e.period})
						</li>
					))}
				</ul>
			</div>

			<div className="flex items-center gap-2 pt-2">
				<a href="/resume.pdf" download className="button">
					Download /public/resume.pdf
				</a>
				<PDFDownloadLink
					document={<ResumePDF data={resume} />}
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
