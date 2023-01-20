const $form = document.querySelector("#form");

$form.onsubmit = function (e) {
    e.preventDefault();
    let player_name = $form.player_name.value;
    if (player_name == "") player_name = "Anonimo";
    window.location.href = `/login/${player_name}`;
};

// var socket = io();
// socket.emit("chat message", "HOLA BEBE");

// socket.on("chat message", function (msg) {
//     console.log("Jejeje holi");
// });
