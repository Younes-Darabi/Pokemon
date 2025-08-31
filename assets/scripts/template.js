function htmlShowAndRenderPokemon(i) {
    let number = (i + 1).toString().padStart(4, "0");;
    let name = pokemonDetails[i].name.charAt(0).toUpperCase() + pokemonDetails[i].name.slice(1);
    let imgUrl = pokemonDetails[i].sprites.other.home.front_default;
    let abilities = pokemonAbilities(i);
    return `
<article class="article_${pokemonDetails[i].abilities[0].ability.name}">
    <div class="article_div">
        <div class="article_details">
            <h2>#${number}</h2>
            <h3>${name}</h3>
            <div class="article_abilities">
                <ul>${abilities}</ul>
            </div>
        </div>
        <img class="article_img" src="${imgUrl}" alt="${name}"></img>
    </div>
</article>
        `;
}

function pokemonAbilities(i) {
    let abilities = "";
    for (let j = 0; j < pokemonDetails[i].abilities.length; j++) {
        let abilitiesName = pokemonDetails[i].abilities[j].ability.name
        abilities += `
            <li class="${abilitiesName}">${abilitiesName}</li>
        `
    }
    return abilities;
}