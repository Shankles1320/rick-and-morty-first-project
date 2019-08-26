import React, { Component } from "react";
import "./App.css";
import CharacterContainer from "./components/Character/charactercontainer";
import Header from "./components/header/Header";
import "./components/header/header.css";
import "./components/Character/character.css";

function App() {
	return (
		<div className="App">
			<Header />
			<CharacterContainer />
		</div>
	);
}

export default App;
