import React from "react";

export default function SkillsTerminal() {
	return (
		<div className="bg-black text-green-400 font-mono text-sm p-2 rounded h-full">
			<p>$ whoami</p>
			<p>cj@retro-code-hub</p>
			<p className="mt-2">$ skills --list</p>
			<pre>
				React, Vite, Tailwind, Framer Motion, Azure DevOps, C#, WPF, jsPDF,
				Postgres, Win95 UI, Testing automation
			</pre>
			<p className="mt-2">$ echo "Hello Malta!"</p>
			<p>Hello Malta! 🇲🇹</p>
		</div>
	);
}
