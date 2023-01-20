const $games = document.querySelector("#games");
setInterval(async () => {
    await fetch_query("POST", null, "./get-games").then((res) => {
        $html = "";
        res.forEach((game) => {
            $html += `
                <tr>
                    <td>${game.id}</td>
                    <td>${game.player1.name}</td>
                    <td>
                        <a href="./join-game/${game.id}" class="btn btn-primary">Unirse</a>
                    </td>
                </tr>
            `;
        });
        $games.innerHTML = $html;
    });
}, 2000);
