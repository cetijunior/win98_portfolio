// src/hooks/useScreenType.js
import { useState, useEffect } from "react";

// Tailwind's default 'sm' breakpoint for mobile/desktop distinction
const MOBILE_BREAKPOINT = 640;

export const useScreenType = () => {
	const [isMobile, setIsMobile] = useState(
		window.innerWidth < MOBILE_BREAKPOINT
	);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { isMobile, isDesktop: !isMobile };
};
