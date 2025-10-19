// src/components/apps/TerminalApp.jsx
import React, { useState, useRef, useEffect } from "react";
import resumeData from "../data/resume";

const COMMANDS = {
	help: "Available commands: 'skills', 'langs', 'experience', 'clear'.",
	skills:
		"Programming: " +
		resumeData.skills.programming.join(", ") +
		"\nFrameworks: " +
		resumeData.skills.frameworks.join(", "),
	langs: "Languages: " + resumeData.languages.join(", "),
	experience:
		"My latest role: " +
		resumeData.experience[0].company +
		" - " +
		resumeData.experience[0].role +
		"\nType 'skills' or 'langs' to see my technical stack.",
	clear: "",
};

const INITIAL_OUTPUT = [
	"Windows 95 Command Prompt [Version 4.0.0.950]",
	"(C)Copyright Microsoft Corp 1981-1995.",
	"Type 'help' for available commands.",
];

export default function TerminalApp() {
	const [history, setHistory] = useState(INITIAL_OUTPUT);
	const [input, setInput] = useState("");
	const inputRef = useRef(null);
	const outputRef = useRef(null);
	const prompt = "C:\\>";

	// Focus input on mount and when history updates (new output)
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
		if (outputRef.current) {
			outputRef.current.scrollTop = outputRef.current.scrollHeight;
		}
	}, [history]);

	const handleCommand = (e) => {
		if (e.key === "Enter") {
			const command = input.trim().toLowerCase();
			const newHistory = [...history, `${prompt} ${input}`];

			if (command === "clear") {
				setHistory(INITIAL_OUTPUT);
				setInput("");
				return;
			}

			const response =
				COMMANDS[command] || `Unknown command: ${command}. Type 'help'.`;

			setHistory([...newHistory, response]);
			setInput("");
		}
	};

	return (
		<div
			className="h-full flex flex-col bg-black text-gray-300 font-mono p-1 overflow-hidden"
			onClick={() => inputRef.current?.focus()} // Click anywhere to focus input
		>
			{/* Output History */}
			<div
				ref={outputRef}
				className="flex-1 overflow-y-auto whitespace-pre-wrap text-sm pt-2 px-2 pb-1"
			>
				{history.map((line, index) => (
					<div
						key={index}
						className={
							line.startsWith(prompt)
								? "text-white font-bold"
								: "text-green-400"
						}
					>
						{line}
					</div>
				))}
			</div>

			{/* Input Line */}
			<div className="flex items-center text-sm px-2 pb-2 mt-1 flex-shrink-0">
				<span className="text-white font-bold">{prompt}</span>
				<input
					ref={inputRef}
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleCommand}
					className="flex-1 bg-black text-green-400 focus:outline-none caret-green-400 pl-1"
					spellCheck="false"
					autoComplete="off"
				/>
			</div>
		</div>
	);
}
