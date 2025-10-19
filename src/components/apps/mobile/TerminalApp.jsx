// src/components/apps/TerminalApp.jsx
import React, { useState, useRef, useEffect } from "react";

export default function TerminalApp() {
	const [history, setHistory] = useState([
		"MS-DOS Prompt",
		"Copyright (C) 1995-1997 Microsoft Corp.",
		"",
		"Type 'help' for a list of commands.",
	]);
	const [command, setCommand] = useState("");
	const terminalEndRef = useRef(null);

	const scrollToBottom = () => {
		terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [history]);

	const handleCommand = (e) => {
		if (e.key === "Enter") {
			const trimmedCommand = command.trim();
			setHistory((prev) => [...prev, `C:\\> ${trimmedCommand}`]);

			let response = "";
			switch (trimmedCommand.toLowerCase()) {
				case "help":
					response = "Available commands: skills, projects, about, clear";
					break;
				case "skills":
					response =
						"Skills: React, JavaScript, Tailwind CSS, Node.js, Cloud (Azure/AWS).";
					break;
				case "projects":
					response =
						"Projects: Portfolio OS, E-commerce Backend, Data ETL pipelines.";
					break;
				case "about":
					response = "About: A brief professional summary.";
					break;
				case "clear":
					setHistory([]);
					setCommand("");
					return;
				case "":
					response = ""; // Do nothing on empty command
					break;
				default:
					response = `Bad command or file name: ${trimmedCommand}`;
			}
			if (response) {
				setHistory((prev) => [...prev, response, ""]);
			}
			setCommand("");
		}
	};

	return (
		<div className="h-full w-full flex flex-col bg-black text-[#ffffff] font-mono text-xs overflow-hidden">
			{/* Terminal Output */}
			<div
				className="flex-1 p-2 overflow-y-auto"
				style={{ scrollbarWidth: "none" }}
			>
				{history.map((line, index) => (
					<pre key={index} className="whitespace-pre-wrap leading-relaxed">
						{line}
					</pre>
				))}
				<div ref={terminalEndRef} />
			</div>

			{/* Input Line */}
			<div className="flex p-2 bg-black border-t border-gray-600 flex-shrink-0">
				<span className="flex-shrink-0 mr-1">C:\&gt;</span>
				<input
					type="text"
					value={command}
					onChange={(e) => setCommand(e.target.value)}
					onKeyDown={handleCommand}
					className="flex-1 bg-black text-[#ffffff] outline-none border-none caret-white"
					autoFocus
				/>
				<span className="w-1 animate-pulse bg-white"></span>
			</div>
		</div>
	);
}
