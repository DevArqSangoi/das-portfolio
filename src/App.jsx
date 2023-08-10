import React from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BootScreen from "./components/BootScreen";

function App() {
	return (
		<div className="container">
			<div className="App">
				<Header />
				<BootScreen />
				<Footer />
			</div>
		</div>
	);
}

export default App;
