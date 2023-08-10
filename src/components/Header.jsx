import React from "react";
import BruteForceSVG from "./BruteForceSVG";

const Header = () => {
	const targetText = "LUCAS FREIRE SANGOI";
	return (
		<header>
			{/* Use BruteForceSVG ao invés de BruteForce */}
			<BruteForceSVG text={targetText} />
		</header>
	);
};

export default Header;
