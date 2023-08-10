import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const AnimatedMarkdown = ({ content }) => {
	const [visibleParagraphs, setVisibleParagraphs] = useState(0);
	const paragraphs = content.split("\n\n"); // considerando que cada parágrafo é separado por duas quebras de linha

	useEffect(() => {
		const interval = setInterval(() => {
			setVisibleParagraphs((prev) => prev + 1);
		}, 500); // mostra um novo parágrafo a cada segundo

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			{paragraphs.map((paragraph, index) => (
				<ReactMarkdown className={`paragraph ${index < visibleParagraphs ? "show" : ""}`} key={index}>
					{paragraph}
				</ReactMarkdown>
			))}
		</div>
	);
};

export default AnimatedMarkdown;
