const router = require("express").Router();
const uniqid = require("uniqid");
const { createGame, getGames, getGame, updateGame } = require("../functions/games");

// game routes
router.get("/login/:name", (req, res) => {
    req.session.id = uniqid();
    req.session.username = req.params.name;
    res.redirect("/");
});

router.get("/create-game", (req, res) => {
    const game = {
        id: uniqid(),
        player1: {
            id: req.session.id,
            name: req.session.username,
            coords: [],
        },
        player2: {
            id: null,
            name: null,
            coords: [],
        },
        winner: null,
    };
    createGame(game);
    res.redirect(`/table/${game.id}`);
});

router.get("/join-game/:game_id", (req, res) => {
    const game = getGame(req.params.game_id);
    console.log(game);
    if (!game) return res.redirect("/");
    if (game.player2.id) return res.redirect("/");
    game.player2.id = req.session.id;
    game.player2.name = req.session.username;
    updateGame(game);
    res.redirect(`/table/${game.id}`);
});

router.post("/get-games", (req, res) => {
    const games = getGames().filter((game) => !game.player2.id && game.player1.id != req.session.id);
    res.json(games);
});

module.exports = router;
