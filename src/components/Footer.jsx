import React from "react";
import BruteForce from "./BruteForce";

const Footer = () => {
	const links = {
		"LinkedIn": "https://www.linkedin.com/in/lucas-sangoi/",
		"GitHub": "https://github.com/DevArqSangoi",
		"Instagram": "https://www.instagram.com/dev.arq.sangoi/",
	};

	const linkItems = [];

	// Construindo os itens de link com o espaçador
	Object.keys(links).forEach((key, index, array) => {
		linkItems.push(<BruteForceLink key={key} text={key} href={links[key]} />);
		// Adiciona o espaçador, exceto após o último item
		if (index !== array.length - 1) {
			linkItems.push(<span key={key + "-spacer"}> | </span>);
		}
	});

	return <footer>{linkItems}</footer>;
};

const BruteForceLink = ({ text, href }) => {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer">
			<BruteForce text={text} />
		</a>
	);
};

export default Footer;
