import { useEffect, useState } from "react";

export function useScreen() {
	const [innerWidth, setInnerWidth] = useState(0);
	const [innerHeight, setInnerHeight] = useState(0);

	const handleResize = () => {
		setInnerWidth(window.innerWidth);
		setInnerHeight(window.innerHeight);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	});

	return {
		innerWidth,
		innerHeight,
	};
}
