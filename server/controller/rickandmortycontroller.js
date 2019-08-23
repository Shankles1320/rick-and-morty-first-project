const data = require("../data.json");
let characterId = 22;

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
		const { character, characterImage, species, episode } = req.body;
		const newCharacter = {
			id: characterId++,
			character,
			characterImage,
			species,
			episode
		};
		data.push(newCharacter);
		res.status(200).send(data);
	},
	putCharacter: (req, res, next) => {
		const { id } = req.params;
		const { update_character } = req.query;
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
		const { character, characterImage, species, episode } = req.body;
		const removeCharacter = {
			id: characterId,
			character,
			characterImage,
			species,
			episode
		};
		data.slice(removeCharacter);
		res.status(200).send(data);
	}
};
