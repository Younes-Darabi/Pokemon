let pokemonDB = [];

function init() {
    pokemonDbMaker();
    pokemonListRender();
}

function pokemonDbMaker() {
    for (let i = 0; i < pokemonNameUrl.length; i++) {
        let number = (i + 1).toString().padStart(4, "0");
        let name = pokemonNameUrl[i].name;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        pokemonDB.push({
            "id": number,
            "name": name,
            "de": pokemonSpecies[i].names[5].name,
            "height": pokemonDetails[i].height,
            "weight": pokemonDetails[i].weight,
            "imageUrl": pokemonDetails[i].sprites.other.home.front_default,
            "types": [],
        });
        pokemonTypesRender(i);
    }
}

function pokemonTypesRender(i) {
    for (let j = 0; j < pokemonTypes[i].length; j++) {
        let typeName = pokemonTypes[i][j].names[4].name;
        pokemonDB[i].types.push(typeName.trim());
    }
}

function pokemonListRender() {
    let output = document.getElementById('pokemon_list');
    let html = "";
    output.innerHTML = "";

    for (let i = 0; i < pokemonDB.length; i++) {
        html += htmlPokemonListRender(i);
    }
    output.innerHTML = html;
}

// function showPokemondetailsInRight(i) {
//     let output = document.getElementById('content_right');
//     output.innerHTML = "";
//     output.innerHTML = htmlShowPokemondetailsInRight(i);
// }

// function savePokemonShortStory() {
//     for (let i = 0; i < pokemonSpecies.length; i++) {
//         let output = "";
//         for (let j = 0; j < pokemonSpecies[i].flavor_text_entries.length; j++) {
//             if (pokemonSpecies[i].flavor_text_entries[j].language.name === "de") {
//                 output = pokemonSpecies[i].flavor_text_entries[j].flavor_text;
//                 break;
//             }
//         }
//         pokemonShortStory.push(output.trim());
//     }
// }