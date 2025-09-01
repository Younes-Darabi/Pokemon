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

function showPokemonTypes(i){
    let types="";
    for (let j = 0; j < pokemonDB[i].types.length; j++) {
        types += `<li class="${pokemonDB[i].types[j]}">${pokemonDB[i].types[j]}</li>`;
    }
    return types;
}

// function htmlShowPokemondetailsInRight(i) {
//     return `
// <div class="div_main">
//     <img class="article_img" src="${pokemonDB[i].imageUrl}" alt="${pokemonDB[i].name}"></img>
//     <h1 class="color_blackT text_align padding-5">#${pokemonDB[i].id}</h1>
//     <h2 class="color_black text_align padding-5">${pokemonDB[i].de}</h2>
//     <p class="pokemon_Story">${pokemonShortStory[i]}</p>
//     <ul>${pokemonTypesRender(i)}</ul>
//     <div class="width_height">
//         <h4>Gewicht: ${pokemonDB[i].weight/10} kg</h4>
//         <h4>Körpergröße: ${pokemonDB[i].height/10} m</h4>
//     </div>
// </div>
//         `;
// }
