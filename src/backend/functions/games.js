const fs = require("fs");

const PATH = "games.json";

//create json file if not exists
function createFile() {
    if (!fs.existsSync(PATH)) {
        fs.writeFileSync(PATH, "[]");
    }
}

function createGame(game) {
    createFile();
    // save in json file
    const games = JSON.parse(fs.readFileSync(PATH, "utf8"));
    games.push(game);
    fs.writeFileSync(PATH, JSON.stringify(games));
}

function updateGame(game) {
    createFile();
    // save in json file
    const games = getGames();
    const index = games.findIndex((g) => g.id == game.id);
    games[index] = game;
    fs.writeFileSync(PATH, JSON.stringify(games));
}

function getGames() {
    createFile();
    // get from json file
    return JSON.parse(fs.readFileSync(PATH, "utf8"));
}

function getGame(id) {
    createFile();
    // get from json file
    const games = JSON.parse(fs.readFileSync(PATH, "utf8"));
    return games.find((game) => game.id == id);
}

function isWinner(game) {
    if (game.player1.coords.length + game.player2.coords.length == 9) return 0;
    if (game.player1.coords.length >= 3) {
        if (game.player1.coords.includes("btn-0-0") && game.player1.coords.includes("btn-0-1") && game.player1.coords.includes("btn-0-2")) return game.player1.id;
        if (game.player1.coords.includes("btn-1-0") && game.player1.coords.includes("btn-1-1") && game.player1.coords.includes("btn-1-2")) return game.player1.id;
        if (game.player1.coords.includes("btn-2-0") && game.player1.coords.includes("btn-2-1") && game.player1.coords.includes("btn-2-2")) return game.player1.id;
        if (game.player1.coords.includes("btn-0-0") && game.player1.coords.includes("btn-1-0") && game.player1.coords.includes("btn-2-0")) return game.player1.id;
        if (game.player1.coords.includes("btn-0-1") && game.player1.coords.includes("btn-1-1") && game.player1.coords.includes("btn-2-1")) return game.player1.id;
        if (game.player1.coords.includes("btn-0-2") && game.player1.coords.includes("btn-1-2") && game.player1.coords.includes("btn-2-2")) return game.player1.id;
        if (game.player1.coords.includes("btn-0-0") && game.player1.coords.includes("btn-1-1") && game.player1.coords.includes("btn-2-2")) return game.player1.id;
        if (game.player1.coords.includes("btn-0-2") && game.player1.coords.includes("btn-1-1") && game.player1.coords.includes("btn-2-0")) return game.player1.id;
    }
    if (game.player2.coords.length >= 3) {
        if (game.player2.coords.includes("btn-0-0") && game.player2.coords.includes("btn-0-1") && game.player2.coords.includes("btn-0-2")) return game.player2.id;
        if (game.player2.coords.includes("btn-1-0") && game.player2.coords.includes("btn-1-1") && game.player2.coords.includes("btn-1-2")) return game.player2.id;
        if (game.player2.coords.includes("btn-2-0") && game.player2.coords.includes("btn-2-1") && game.player2.coords.includes("btn-2-2")) return game.player2.id;
        if (game.player2.coords.includes("btn-0-0") && game.player2.coords.includes("btn-1-0") && game.player2.coords.includes("btn-2-0")) return game.player2.id;
        if (game.player2.coords.includes("btn-0-1") && game.player2.coords.includes("btn-1-1") && game.player2.coords.includes("btn-2-1")) return game.player2.id;
        if (game.player2.coords.includes("btn-0-2") && game.player2.coords.includes("btn-1-2") && game.player2.coords.includes("btn-2-2")) return game.player2.id;
        if (game.player2.coords.includes("btn-0-0") && game.player2.coords.includes("btn-1-1") && game.player2.coords.includes("btn-2-2")) return game.player2.id;
        if (game.player2.coords.includes("btn-0-2") && game.player2.coords.includes("btn-1-1") && game.player2.coords.includes("btn-2-0")) return game.player2.id;
    }
    return -1;
}

module.exports = {
    createGame,
    updateGame,
    getGames,
    getGame,
    isWinner,
};
