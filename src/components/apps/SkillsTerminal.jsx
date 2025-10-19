import React from "react";
import resume from "../data/resume.js";

export default function SkillsTerminal() {
	const allSkills = [
		...resume.skills.programming,
		...resume.skills.frameworks,
		...resume.skills.tools,
	];

	return (
		<div className="bg-black text-green-400 font-mono text-sm p-2 rounded h-full overflow-auto">
			<p>$ whoami</p>
			<p>cj@retro-code-hub</p>

			<p className="mt-2">$ skills --list</p>
			{/* Wrap long text inside <pre> */}
			<pre className="whitespace-pre-wrap break-words">
				{allSkills.join(", ")}
			</pre>

			<p className="mt-2">$ languages --list</p>
			<pre className="whitespace-pre-wrap break-words">
				{resume.languages.join(", ")}
			</pre>

			<p className="mt-2">$ echo "Hello Malta!"</p>
			<p>Hello Malta! 🇲🇹</p>
		</div>
	);
}
