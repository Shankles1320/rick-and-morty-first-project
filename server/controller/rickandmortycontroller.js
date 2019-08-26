const data = require("../data.json");
let characterId = 22;
let character = [];

module.exports = {
	getAllCharacters: (req, res, next) => {
		res.status(200).send(data);
	},
	getCharacterById: (req, res, next) => {
		const { id } = req.params;
		const index = data.findIndex((character) => {
			return character.id === parseInt(id);
		});
		if (index !== -1) {
			res.status(200).send(data[index]);
		} else {
			res.status(404).send("character not found");
		}
	},
	postCharacter: (req, res, next) => {
		const { name, image, species, episode } = req.body;
		const newCharacter = {
			id: characterId++,
			name,
			image,
			species,
			episode
		};
		data.push(newCharacter);
		res.status(200).send(data);
	},
	putCharacter: (req, res, next) => {
		const { id } = req.params;
		const { update_character } = req.body;
		const index = data.findIndex((character) => {
			return character.id === parseInt(id);
		});
		if (index !== -1) {
			data[index].character = +update_character || data[index].character;
			res.status(200).send(data);
		} else {
			res.status(404).send("Character not found");
		}
	},

	removeCharacter: (req, res, next) => {
		const { id } = req.params;
		const index = data.findIndex((character) => {
			return character.id === parseInt(id);
		});
		if (index !== -1) {
			data.splice(index, 1);
		}
		console.log(id, index);
		res.status(200).send(data);
	},
	updateCharacter(req, res) {
		let index = null;
		character.forEach((character, i) => {
			if (character.id === Number(req.params.id)) index = i;
		});
		character[index] = {
			name: req.body.name || character[index].name,
			species: req.body.species || character[index].species,
			// episode: req.body.episode || character[index].episode,
			image: req.body.image || character[index].image
		};
		res.status(200).send(data);
	}
};
