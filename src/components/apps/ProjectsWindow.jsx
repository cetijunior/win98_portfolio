import React from "react";

const projects = [
	{ title: "MotoRent Bovilla", live: "#", repo: "#" },
	{ title: "Garage MT", live: "#", repo: "#" },
	{ title: "BF-Netzbau", live: "#", repo: "#" },
	{ title: "BF-Wartungsservices", live: "#", repo: "#" },
	{ title: "EntroWeb", live: "#", repo: "#" },
	{
		title: "CA Web Services — CJ Portfolio",
		live: "https://www.ca-webservices.com/about/cj",
		repo: "#",
	},
];

export default function ProjectsWindow({ openDetail }) {
	return (
		<div>
			<div className="mb-2 flex items-center gap-2">
				<img src="/icons/projects.png" className="w-6 h-6" alt="" />
				<h3 className="font-bold">Projects</h3>
			</div>

			<table className="w-full text-sm">
				<thead>
					<tr className="text-left">
						<th className="py-1">Name</th>
						<th>Live</th>
						<th>Repo</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((p) => (
						<tr key={p.title} className="odd:bg-slate-100">
							<td className="py-1 pr-2">
								<button
									className="underline"
									onDoubleClick={() => openDetail?.(p.title)}
								>
									{p.title}
								</button>
							</td>
							<td className="text-center">
								<a
									className="button"
									href={p.live}
									target="_blank"
									rel="noreferrer"
								>
									Open
								</a>
							</td>
							<td className="text-center">
								<a
									className="button"
									href={p.repo}
									target="_blank"
									rel="noreferrer"
								>
									Repo
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<p className="mt-2 text-xs text-slate-600">
				Double-click a project name to open details (placeholder). Add real
				Live/Repo links as they’re ready.
			</p>
		</div>
	);
}
