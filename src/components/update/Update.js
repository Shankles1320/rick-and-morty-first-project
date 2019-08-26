import React, { Component } from "react";
import axios from "axios";

export default class Update extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			species: "",
			image: ""
		};
		this.updateCharacter = this.updateCharacter.bind(this);
	}

	updateCharacter = () => {
		axios
			.put(`/api/morty/${this.props.character.id}`, {
				name: this.state.name,
				species: this.state.species,
				image: this.state.image
			})
			.then((response) => {
				this.setState({ addCharacter: response.data });
			});
	};
	universalInput(property, value) {
		this.setState({
			[property]: value
		});
	}

	render() {
		const { character } = this.props;
		return (
			<div key={character.id}>
				<div>{character.name}</div>
				<div>{character.species}</div>
				<div>
					{character.episode &&
						character.episode.map((url) => {
							const splitUrl = url.split("/");
							const episodeNumber = splitUrl[splitUrl.length - 1];

							return episodeNumber + ", ";
						})}
					<div>
						<img src={character.image} />
					</div>
					<button
						onClick={(e) => this.props.removeCharacter(character.id)}
						type="button"
						className="ntm btn-default btn-sm"
					>
						Remove Dimension
					</button>
					<div>
						<input
							placeholder="Name"
							onChange={(event) =>
								this.setState({
									name: [event.target.value]
								})
							}
							value={this.state.name}
						/>
						<input
							placeholder="Species"
							onChange={(event) =>
								this.setState({
									species: [event.target.value]
								})
							}
							value={this.state.species}
						/>
						<input
							placeholder="CharacterImage"
							onChange={(event) =>
								this.setState({
									image: [event.target.value]
								})
							}
							value={this.state.image}
						/>
						<button onClick={this.updateCharacter}>Update Dimension</button>
					</div>
				</div>
			</div>
		);
	}
}
