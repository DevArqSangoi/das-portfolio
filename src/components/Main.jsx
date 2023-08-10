import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Main = () => {
	const [inputValue, setInputValue] = useState("");
	const [commandHistory, setCommandHistory] = useState([]);
	const inputRef = useRef(null);
	const terminalRef = useRef(null);
	const sectionToFileMapping = {
		"Resumo Profissional": "resumo",
		"Formação": "formacao",
		"Atividades Extracurriculares": "atividades",
		"Habilidades Técnicas": "habilidades",
		"Experiência da Arquitetura": "experiencia",
		"Idiomas": "idiomas",
		"Competências Interpessoais": "competencias",
		"Projetos Desenvolvidos": "projetos",
		"Histórico com os Computadores – TL;DR;": "historicotld",
		"Histórico com os Computadores – Versão do Diretor": "historicodiretor",
	};

	const handleHelp = async () => {
		try {
			const response = await fetch(`/markdown/help.md`);
			if (!response.ok || !response.headers.get("content-type")?.includes("text/markdown")) {
				throw new Error("Não foi possível carregar o arquivo ou o arquivo não é um Markdown válido.");
			}
			const content = await response.text();
			setCommandHistory((prevHistory) => [
				...prevHistory,
				{ command: "help", response: <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} /> },
			]);
		} catch (error) {
			console.error("Erro ao carregar arquivo:", error);
			setCommandHistory((prevHistory) => [
				...prevHistory,
				{ command: "help", response: "Erro ao carregar o conteúdo de ajuda. Tente novamente mais tarde." },
			]);
		}
	};

	const handleList = async () => {
		try {
			const response = await fetch(`/markdown/list.md`);
			if (!response.ok || !response.headers.get("content-type")?.includes("text/markdown")) {
				throw new Error("Não foi possível carregar o arquivo ou o arquivo não é um Markdown válido.");
			}
			const content = await response.text();
			setCommandHistory((prevHistory) => [
				...prevHistory,
				{ command: "list", response: <ReactMarkdown children={content} /> },
			]);
		} catch (error) {
			console.error("Erro ao carregar arquivo:", error);
			setCommandHistory((prevHistory) => [
				...prevHistory,
				{ command: "list", response: "Erro ao carregar o conteúdo de ajuda. Tente novamente mais tarde." },
			]);
		}
	};

	const handleMenuSelection = async (option) => {
		const filename = sectionToFileMapping[option];
		try {
			const response = await fetch(`/markdown/${filename}.md`);
			if (!response.ok || !response.headers.get("content-type")?.includes("text/markdown")) {
				throw new Error("Não foi possível carregar o arquivo ou o arquivo não é um Markdown válido.");
			}
			const content = await response.text();
			setCommandHistory((prevHistory) => {
				const newHistory = [...prevHistory];
				newHistory[newHistory.length - 1] = {
					...newHistory[newHistory.length - 1],
					response: <ReactMarkdown children={content} />,
					ref: terminalRef,
				};
				return newHistory;
			});
		} catch (error) {
			console.error("Erro ao carregar arquivo:", error);
			setCommandHistory((prevHistory) => [
				...prevHistory,
				{ command: option, response: "Erro ao carregar o conteúdo. Tente novamente mais tarde." },
			]);
		}
	};

	const handleClear = () => {
		setCommandHistory([]);
	};

	const handleCommand = (command) => {
		command = command.toUpperCase(); // Convertendo o comando para maiúsculas
		if (command === "CLS") {
			handleClear();
		} else if (command === "HELP") {
			handleHelp();
		} else if (command === "LIST") {
			handleList();
		} else if (!isNaN(command) && command >= 0 && command <= 9) {
			const optionTitles = Object.keys(sectionToFileMapping);
			const option = optionTitles[parseInt(command)];
			if (option) {
				setCommandHistory((prevHistory) => [...prevHistory, { command: command, response: "" }]);
				handleMenuSelection(option);
			}
		} else {
			setCommandHistory((prevHistory) => [
				...prevHistory,
				{
					command: command,
					response: "Comando não reconhecido. Use 'HELP' para ver a lista de comandos.",
				},
			]);
		}
		setInputValue("");
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [commandHistory]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<main className="msdos-container">
			<div className="cmd-header">
				Microsoft MS-DOS version 2.11
				<br />
				Copyright 1981,82,83 Microsoft Corp.
				<br />
				Use 'help' para ver a lista de comandos.
			</div>
			<div className="msdos-prompt">
				{commandHistory.map((item, index) => (
					<div key={index} ref={item.ref}>
						<span className="cdoispontos">C:\DevArqSangoi&gt;</span> <span className="command">{item.command}</span>
						<br />
						{item.response && (
							<span>
								{item.response}
								<br />
							</span>
						)}
					</div>
				))}

				<span ref={terminalRef}></span>
				<div>
					<span className="cdoispontos">C:\DevArqSangoi&gt;</span>{" "}
					<input
						ref={inputRef}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleCommand(inputValue);
							}
						}}
					/>
				</div>
			</div>
		</main>
	);
};

export default Main;
