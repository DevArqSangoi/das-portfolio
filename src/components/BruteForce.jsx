import React, { useState, useEffect } from "react";

const BruteForce = ({ text = "", chars = "abcdefghijklmnopqrstuvwxyz1234567890" }) => {
	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		let currentText = "";
		let counter = 0;
		const revealDelay = 5; // Ajuste este valor conforme desejado

		const interval = setInterval(() => {
			counter++;

			// Adicione uma letra ao currentText a cada 'revealDelay' intervalos
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

	return <span>{displayedText}</span>;
};

export default BruteForce;
