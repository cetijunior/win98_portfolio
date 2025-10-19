// Desktop Icons
<div className="absolute z-10 top-4 left-4 right-4 bottom-12 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,80px)] gap-6 content-start pointer-events-auto">
	{icons.map((ic) => (
		<div
			key={ic.id}
			className={`flex flex-col items-center gap-2 cursor-pointer group p-2 rounded transition-all ${
				selectedIcon === ic.id ? "bg-[#000080] text-white" : "hover:bg-white/10"
			}`}
			onClick={(e) => {
				e.stopPropagation();
				setSelectedIcon(ic.id);
			}}
			onDoubleClick={(e) => {
				e.stopPropagation();
				ic.onOpen();
			}}
			title={ic.label}
		>
			<img
				src={ic.src}
				alt={ic.label}
				className="w-12 h-12 object-contain" // Adjust size as needed
			/>
			<div className="text-xs text-white text-center leading-tight truncate w-full font-medium">
				{ic.label}
			</div>
		</div>
	))}
</div>;
