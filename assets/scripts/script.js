function showAndRenderPokemon() {
    let output = document.getElementById('content');
    let html = "";
    output.innerHTML = "";
    for (let i = 0; i < pokemonDetails.length; i++) {
        html += htmlShowAndRenderPokemon(i);
        output.innerHTML = html;
    }
}