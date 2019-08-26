import React, { Component } from "react";
import axios from "axios";
import Update from "../update/Update";

export default class CharacterContainer extends Component {
	constructor() {
		super();

		this.state = {
			addCharacter: [],
			id: 1,
			name: "",
			image: "",
			episode: [],
			species: "",
			episodeUrls: []
		};
		this.submitCharacter = this.submitCharacter.bind(this);
		this.removeCharacter = this.removeCharacter.bind(this);
	}

	componentDidMount() {
		axios.get("/api/getswifty").then((response) => {
			this.setState({ addCharacter: response.data });
			console.log(response.data);
		});
	}

	universalInput(property, value) {
		this.setState({
			[property]: value
		});
	}

	submitCharacter() {
		const { name, image, episode, species } = this.state;
		const newCharacter = { name, image, episode, species };

		axios
			.post("http://localhost:3000/api/simplerick/:id", newCharacter)
			.then((response) => {
				this.setState({
					addCharacter: response.data,
					name: "",
					image: "",
					episode: [],
					species: "",
					episodeUrls: []
				});
			});
	}

	removeCharacter(id) {
		axios
			.delete(`http://localhost:3000/api/armyofricks/${id}`)
			.then((response) => {
				this.setState({ addCharacter: response.data });
			});
	}

	render() {
		const { addCharacter, id, name, image, episode, species } = this.state;
		const mappedCharacterList = addCharacter.map((character) => {
			return (
				<Update character={character} removeCharacter={this.removeCharacter} />
			);
		});
		return (
			<div className="background">
				<div>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							this.submitCharacter();
						}}
					>
						<input
							placeholder="ID"
							onChange={(event) =>
								this.universalInput("id", event.target.value)
							}
							value={id}
						/>
						<input
							placeholder="characterName"
							onChange={(event) =>
								this.universalInput("name", event.target.value)
							}
							value={name}
						/>
						<input
							placeholder="CharacterImage"
							onChange={(event) =>
								this.universalInput("image", event.target.value)
							}
							value={image}
						/>
						<input
							placeholder="Episode"
							onChange={(event) =>
								this.setState({
									episode: [event.target.value]
								})
							}
							value={episode}
						/>
						<input
							placeholder="Species"
							onChange={(event) =>
								this.universalInput("species", event.target.value)
							}
							value={species}
						/>

						<button>{this.addCharacter}Add Dimension</button>
					</form>

					<div className="character"> {mappedCharacterList}</div>
				</div>
			</div>
		);
	}
}
