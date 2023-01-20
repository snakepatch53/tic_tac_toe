// REQUIRES
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const session = require("express-session");
const { getGame, getGames, updateGame, isWinner } = require("./src/backend/functions/games");

// SERVER
const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use("/static", express.static("public"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/frontend/pages/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(session({ secret: "2C44-4D44-WppQ38S", resave: true, saveUninitialized: true }));

// ROUTES
app.use(require("./src/backend/routes/views"));
app.use(require("./src/backend/routes/services"));

// socket.io
io.on("connection", (socket) => {
    console.log("Conected..!");
    socket.on("disconnect", (socket) => console.log(socket));

    socket.on("connection", ({ game_id, player_id }) => {
        const game = getGame(game_id);
        io.emit("connection", { game, player_id });
    });

    socket.on("iteration", ({ game_id, player_id, coords }) => {
        const game = getGame(game_id);
        if (player_id == game.player1.id) game.player1.coords.push(coords);
        else game.player2.coords.push(coords);
        const winner = isWinner(game);
        game.winner = winner;
        updateGame(game);
        io.emit("iteration", { game, player_id });
    });
});

server.listen(PORT, () => {
    console.log(`Listening in http://localhost:${PORT}`);
});
