// SOCKET IO
var socket = io();

// DOM
const $BUTTONS = document.querySelectorAll(".btn-iteration");
const $TABLE_GAME = document.querySelector("#table-game");
const $PLAYER1_NAME = document.querySelector("#player1_name");
const $PLAYER2_NAME = document.querySelector("#player2_name");
const $TURN_NAME = document.querySelector("#turn_name");

// Variables
let MY_GAME = {
    me: {},
    to: {},
};

// DOM EVENTS
function updateEvents() {
    $BUTTONS.forEach(($button) => {
        if (MY_GAME.me.coords.includes($button.id)) {
            $button.classList.add("disabled");
            $button.innerText = "O";
            $button.classList.remove("text-danger");
            $button.classList.add("text-success");
            $button.onclick = null;
            return;
        }
        if (MY_GAME.to.coords.includes($button.id)) {
            $button.classList.add("disabled");
            $button.innerText = "X";
            $button.classList.add("text-danger");
            $button.classList.remove("text-success");
            $button.onclick = null;
            return;
        }
        $button.onclick = (evt) => {
            evt.preventDefault();
            const coords = $button.id;
            socket.emit("iteration", { game_id: GAME.id, player_id: SESSION_ID, coords });
            console.log(coords);
        };
    });
}
// FUNCTIONS
function setTurn(player_id) {
    $BUTTONS.forEach(($button) => {
        if (MY_GAME.me.id == player_id) {
            $button.classList.remove("disabled");
            $button.disabled = false;
            $TURN_NAME.innerHTML = MY_GAME.me.name;
            $TURN_NAME.classList.remove("text-danger");
            $TURN_NAME.classList.add("text-success");
        } else {
            $button.classList.add("disabled");
            $button.disabled = true;
            $TURN_NAME.innerHTML = MY_GAME.to.name;
            $TURN_NAME.classList.remove("text-success");
            $TURN_NAME.classList.add("text-danger");
            $button.onclick = null;
        }
    });
}

function updateMY_GAME(game) {
    MY_GAME.me = game.player1.id == SESSION_ID ? game.player1 : game.player2;
    MY_GAME.to = game.player1.id == SESSION_ID ? game.player2 : game.player1;
}

// SOCKET EVENTS

// iteration
socket.on("iteration", function ({ game, player_id }) {
    if (game.id != GAME.id) return;
    // setTurn
    if (player_id == MY_GAME.me.id) setTurn(MY_GAME.to.id);
    else setTurn(MY_GAME.me.id);
    updateMY_GAME(game);
    updateEvents();

    //winner
    if (game.winner != -1) {
        let msg_alert = "";
        if (game.winner == MY_GAME.me.id) {
            msg_alert = "Ganaste!";
        } else if (game.winner == MY_GAME.to.id) {
            msg_alert = "Perdiste!";
        } else if (game.winner == 0) {
            msg_alert = "Empate!";
        }
        setTimeout(() => {
            alert(msg_alert);
            window.location.href = "/";
        }, 1000);
        return;
    }
});

//Connection
socket.emit("connection", { game_id: GAME.id, player_id: SESSION_ID });

socket.on("connection", function ({ game, player_id }) {
    console.log(game.id + " === " + GAME.id);
    if (game.id != GAME.id || (player_id == SESSION_ID && game.player1.id == SESSION_ID)) return;
    // MY_GAME.me = game.player1.id == SESSION_ID ? game.player1 : game.player2;
    // MY_GAME.to = game.player1.id == SESSION_ID ? game.player2 : game.player1;
    updateMY_GAME(game);
    $TABLE_GAME.classList.remove("d-none");
    $PLAYER1_NAME.innerHTML = MY_GAME.me.name;
    $PLAYER2_NAME.innerHTML = MY_GAME.to.name;
    updateEvents();
    setTurn(GAME.player1.id);
    console.log("CONFIRMO!");
});
