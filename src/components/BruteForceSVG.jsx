import React, { useState, useEffect } from "react";

const BruteForceSVG = ({ text = "", chars = "abcdefghijklmnopqrstuvwxyz1234567890" }) => {
	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		let currentText = "";
		let counter = 0;
		const revealDelay = 5;

		const interval = setInterval(() => {
			counter++;

			if (counter % revealDelay === 0) {
				currentText += text[currentText.length];
			}

			setDisplayedText(currentText + randomString(text.length - currentText.length));

			if (currentText.length === text.length) {
				clearInterval(interval);
			}
		}, 100);

		return () => clearInterval(interval);
	}, [text]);

	function randomString(length) {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?/{}[]|:;,.~";
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	return (
		<svg width="400" height="50" xmlns="http://www.w3.org/2000/svg">
			<text
				x="200"
				y="25"
				fontFamily="'Glass-TTY-VT220', 'Courier New', monospace"
				fontSize="30"
				fill="#00FF00"
				textAnchor="middle"
				dominantBaseline="middle">
				{displayedText}
			</text>
		</svg>
	);
};

export default BruteForceSVG;
