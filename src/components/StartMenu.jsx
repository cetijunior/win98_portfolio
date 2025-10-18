// ============================================
// START MENU COMPONENT
// ============================================
export default function StartMenu({ isOpen, onClose, onOpen }) {
	if (!isOpen) return null;

	const menuItems = [
		{ label: "My Computer", icon: "💾", action: "projects" },
		{ label: "Documents", icon: "📄", action: "resume" },
		{ label: "Skills Terminal", icon: "⚙️", action: "skills" },
		{ label: "About Me", icon: "ℹ️", action: "about" },
	];

	return (
		<>
			{/* Click outside to close */}
			<div
				className="fixed inset-0 z-40"
				onClick={onClose}
				onContextMenu={(e) => e.preventDefault()}
			/>

			{/* Start Menu */}
			<div
				className="fixed bottom-[85px] left-[34px] bg-[#c0c0c0] z-50 w-56"
				style={{
					border: "2px solid #dfdfdf",
					boxShadow:
						"inset 1px 1px 0 rgba(255,255,255,0.8), -2px -2px 0 rgba(0,0,0,0.5)",
				}}
			>
				{/* Menu header */}
				<div
					className="bg-gradient-to-r from-[#000080] to-[#1084d7] text-white px-4 py-3 font-bold text-sm"
					style={{
						boxShadow:
							"inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.3)",
					}}
				>
					Windows 95
				</div>

				{/* Menu items */}
				<div className="py-2">
					{menuItems.map((item, idx) => (
						<div
							key={idx}
							className="px-2 py-2 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-3 transition-colors"
							onClick={() => {
								onOpen(item.action);
								onClose();
							}}
						>
							<span className="text-lg">{item.icon}</span>
							<span className="text-xs font-bold">{item.label}</span>
						</div>
					))}
				</div>

				{/* Separator */}
				<hr className="my-1 bg-[#808080] h-px border-0" />

				{/* Shutdown option */}
				<div className="px-2 py-2 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-3 transition-colors">
					<span className="text-lg">🔌</span>
					<span className="text-xs font-bold">Shut Down...</span>
				</div>
			</div>
		</>
	);
}
