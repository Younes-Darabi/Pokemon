function pokemonListRender() {
    let output = document.getElementById('pokemon_list');
    let html = "";
    output.innerHTML = "";

    for (let i = 0; i < pokemonDB.length; i++) {
        html += htmlPokemonListRender(i);
    }
    output.innerHTML = html;

    document.getElementById('content_loading').style.display = "none"
    document.getElementById('div_body').classList.remove('display_none')
}

function htmlPokemonListRender(i) {
    return `
<article onclick="showPokemondetailsInRight(${i})" class="bg_${pokemonDB[i].types[0]}">
    <div class="article_div">
        <div class="details_img">
            <div class="title_number">
                <h2>#${(pokemonDB[i].id).toString().padStart(4, "0")}</h2>
                <h3>${pokemonDB[i].de}</h3>
            </div>
            <img class="article_img" src="${pokemonDB[i].imageUrl}" alt="${pokemonDB[i].name}"></img>
        </div>
        <div class="article_types">
            <ul>${showPokemonTypes(i)}</ul>
        </div>
    </div>
</article>
`;
}

function htmlShowPokemondetailsInRight(i) {
    return `
<div class="div_main">
    <img class="article_img" src="${pokemonDB[i].imageUrl}" alt="${pokemonDB[i].de}"></img>
    <h2 class="color_blackT text_align padding-5">#${pokemonDB[i].id}</h2>
    <h3 class="color_black text_align padding-5">${pokemonDB[i].de}</h3>
    <p class="pokemon_Story">${pokemonDB[i].story}</p>
    <ul class="types">${showPokemonTypes(i)}</ul>
    <div class="weight_height">
        <h4>Gewicht</h4>
        <h4>${pokemonDB[i].weight / 10} kg</h4>
    </div>
    <div class="weight_height">
        <h4>Körpergröße</h4>
        <h4>${pokemonDB[i].height / 10} m</h4>
    </div>
    <div class="abilities">
        <h4>Fähigkeiten</h4>
        <ul>${showPokemonAbilities(i)}</ul>
    </div>
</div>
        `;
}

function showPokemondetailsInRight(i) {
    let output = document.getElementById('content_right');
    output.classList = "content_right";
    output.classList.add(`bg${pokemonDB[i].types[0]}`);
    output.innerHTML = "";
    output.innerHTML = htmlShowPokemondetailsInRight(i);
}

function showPokemonTypes(i) {
    let types = "";
    for (let j = 0; j < pokemonDB[i].types.length; j++) {
        types += `<li class="${pokemonDB[i].types[j]}">${pokemonDB[i].types[j]}</li>`;
    }
    return types;
}

function showPokemonAbilities(i) {
    let abilities = "";
    for (let j = 0; j < pokemonDB[i].abilities.length; j++) {
        abilities += `<li>${pokemonDB[i].abilities[j]}</li>`;
    }
    return abilities;
}
