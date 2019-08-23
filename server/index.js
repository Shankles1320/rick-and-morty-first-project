const express = require("express");
const app = express();
const data = require("./data.json");
const rickandmortyController = require("./controller/rickandmortycontroller");

app.use(express.json());

app.get("/api/getswifty", rickandmortyController.getAllCharacters);

app.get("/api/meeseeks/:id", rickandmortyController.getCharacterById);

app.post("/api/simplerick/:id", rickandmortyController.postCharacter);

app.put("/api/morty/:id", rickandmortyController.putCharacter);

app.delete("/api/armyofricks/:id", rickandmortyController.removeCharacter);

const port = 4500;
app.listen(port, () => console.log(`get swifty on ${port}`));
