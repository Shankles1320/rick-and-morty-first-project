import React, { Component } from "react";
import axios from "axios";

export default class CharacterContainer extends Component {
	constructor() {
		super();
		this.state = {
			addCharacter: [],
			id: 1,
			characterName: "",
			characterImage: "",
			episode: "",
			species: ""
		};
	}

	componentDidMount() {
		axios.get("/api/getswifty").then((response) => {
			console.log(response.data);
			this.setState({ character: response.data });
			console.log(response.data);
		});
	}

	universalInput(property, value) {
		this.setState({
			[property]: value
		});
	}

	submitCharacter() {
		const { character, characterImage, episode, species } = this.state;
		const newCharacter = { character, characterImage, episode, species };

		axios.post("/api/simplerick", newCharacter).then((response) => {
			this.setState({
				addCharacter: response.data
			});
		});
	}

	render() {
		const { id, character, characterImage, episode, species } = this.state;
		const mappedCharacterList = addcharacter.map((character) => {
			return (
				<div key={character.id}>
					<div>{character.characterName}</div>
					<div>{character.episode}</div>
					<div>{character.species}</div>
					<div>
						<img src={character.characterImage} />
					</div>
				</div>
			);
		});

		return (
			<div>
				<div>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							this.submitCharacter();
						}}
					>
						<imput
							placeholder="ID"
							onChange={(event) =>
								this.universalInput("id", event.target.value)
							}
							value={id}
						/>
						<input
							placeholder="characterName"
							onChange={(event) =>
								this.universalInput("characterName", event.target.value)
							}
							value={character}
						/>
						<input
							placeholder="CharacterImage"
							onChange={(event) =>
								this.universalInput("characterImage", event.target.value)
							}
							value={characterImage}
						/>
						<input
							placeholder="Episode"
							onChange={(event) =>
								this.universalInput("episode", event.target.value)
							}
							value={episode}
						/>
						<input
							placeholder="Species"
							onChange={(event) =>
								this.universalInput("Species", event.target.value)
							}
							value={species}
						/>
						<button>Add User</button>
					</form>

					<div> {mappedCharacterList}</div>
				</div>
			</div>
		);
	}
}
