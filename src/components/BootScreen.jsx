import React, { useEffect, useState } from "react";
import Main from "./Main";
import energyStarLogo from '../assets/imgs/epa.png';

const detectionLines = [
	["Detecting IDE Primary Master ", 0, ""],
	["Detecting IDE Primary Slave ", 0, ""],
	["Detecting IDE Secondary Master ", 0, ""],
	["Detecting IDE Secondary Slave ", 0, ""],
];

export default function BootScreen() {
	const [booting, setBooting] = useState(true);
	const [extraDelay, setExtraDelay] = useState(false);
	const [memory, setMemory] = useState(0);
	const [stage, setStage] = useState(0);
	const [waitDots, setWaitDots] = useState("");
	const [detectionSteps, setDetectionSteps] = useState([...detectionLines]);
	const [delayDetection, setDelayDetection] = useState(true);

	useEffect(() => {
		if (memory >= 16384) {
			setTimeout(() => {
				setDelayDetection(false);
			}, 1000);
			return;
		}

		const memoryInterval = setInterval(() => {
			setMemory((prevMemory) => {
				if (prevMemory + 64 > 16384) {
					return 16384;
				}
				return prevMemory + 64;
			});
		}, 1);

		return () => {
			clearInterval(memoryInterval);
		};
	}, [memory]);

	const updateDots = (index) => {
		setDetectionSteps((prevSteps) =>
			prevSteps.map((step, i) => {
				if (i !== index) return step;
				if (step[1] < 3) {
					step[1]++;
					return [step[0], step[1], ""];
				}
				if (step[1] === 3 && step[2] !== "None") {
					setExtraDelay(true);
					return [step[0], step[1], "None"];
				}
				return step;
			})
		);

		setStage((prevStage) => {
			if (prevStage === index && detectionSteps[index][1] === 3 && detectionSteps[index][2] === "None") {
				return prevStage + 1;
			}
			return prevStage;
		});
	};

	useEffect(() => {
		if (delayDetection || stage > 4) {
			return;
		}
		const bootInterval = setInterval(() => {
			if (stage < 4) {
				if (extraDelay) {
					setTimeout(() => {
						setExtraDelay(false);
						setStage(stage + 1);
					}, 2000);
				} else {
					updateDots(stage);
				}
			} else if (stage === 4) {
				setWaitDots((prevDots) => (prevDots.length % 4 !== 3 ? prevDots + "." : prevDots));
				if (waitDots.length % 4 === 3) {
					clearInterval(bootInterval);
					setTimeout(() => {
						setBooting(false);
					}, 2000);
				}
			}
		}, 500);

		return () => {
			clearInterval(bootInterval);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage, detectionSteps, waitDots, extraDelay, delayDetection]);

	if (booting) {
		return (
			<div className="boot-screen">
				<div className="boot-screen-header">
					<div className="boot-text">
						<div>Award Modular BIOS v4.51PG, An Energy Star Ally</div>
						<div>Copyright (C) 1984-97, Award Software, Inc.</div>
						<div>(55XWVQ0E) Intel i430VX PCIset(TM)</div>
					</div>
					<img src={energyStarLogo} alt="Energy Star Logo" className="energy-star-logo" />
				</div>
				<div className="boot-screen-main">
					<div>Intel(R) Pentium(R) PRO-MMX CPU at 120MHz</div>
					<div>Memory Test : {memory <= 16384 ? memory : 16384}K OK</div>
					<table className="detection-table">
						<tbody>
							{memory >= 16384 &&
								!delayDetection &&
								detectionSteps.map(
									(step, index) =>
										index <= stage && (
											<tr key={index}>
												<td>{step[0]}</td>
												<td style={{ textAlign: "left" }}>{".".repeat(step[1])}</td>
												<td style={{ textAlign: "left" }}>{step[2] ? "None" : ""}</td>
											</tr>
										)
								)}
						</tbody>
					</table>
					{stage === 4 && <p>WAIT{waitDots}</p>}
				</div>
				<div className="boot-screen-footer">
					<div>Press DEL to enter SETUP</div>
					<div>12/10/97-i430VX,UMC8669-2A59GH2BC-00</div>
				</div>
			</div>
		);
	} else {
		return <Main />;
	}
}
