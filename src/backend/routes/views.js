const router = require("express").Router();
const uniqid = require("uniqid");
const { getGame } = require("../functions/games");

function sessionMiddleware(req, res, next) {
    if (!req.session.username) {
        res.render("index", {
            token: uniqid(),
        });
        return;
    }
    next();
}

// html routes
router.get("/", sessionMiddleware, (req, res) => {
    res.render("menu", {
        session: req.session,
        player_name: req.session.username,
    });
});

router.get("/table/:id", sessionMiddleware, (req, res) => {
    const game = getGame(req.params.id);
    if (!game || (req.session.id != game.player1.id && req.session.id != game.player2.id)) return res.redirect("/");
    res.render("table", {
        session: req.session,
        player_name: req.session.username,
        game,
    });
});

router.get("/find-game", sessionMiddleware, (req, res) => {
    res.render("find", {
        session: req.session,
        player_name: req.session.username,
    });
});

module.exports = router;
