import React from "react";

const projects = [
	{ title: "Garage MT", live: "#", repo: "#" },
	{ title: "MotoRent Bovilla", live: "#", repo: "#" },
	{ title: "EntroWeb", live: "#", repo: "#" },
];

export default function ProjectsWindow({ openDetail }) {
	return (
		<div>
			<div className="mb-2 flex items-center gap-2">
				<img src="/icons/projects.png" className="w-6 h-6" />
				<h3 className="font-bold">Projects</h3>
			</div>
			<table className="w-full text-sm">
				<thead>
					<tr>
						<th className="text-left">Name</th>
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
								<a className="button" href={p.live} target="_blank">
									Open
								</a>
							</td>
							<td className="text-center">
								<a className="button" href={p.repo} target="_blank">
									Repo
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
