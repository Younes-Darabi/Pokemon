let pokemonDB = [];
let dbForPokemonDB = [];
let searchPokemonDB = [];
let arrayFilter = [];

function init() {
    pokemonDbMaker();
    pokemonDB.push(...dbForPokemonDB);
    savePokemonShortStoryPokemonDB();
    saveAbilitiesInPokemonDB();
    saveStatsInPokemonDB();
    pokemonListRender(pokemonDB, 'pokemonDB');
    showPokemondetailsInRight(0, pokemonDB);
}

function pokemonListRender(list, listName) {
    let output = document.getElementById('pokemon_list');
    let html = "";
    output.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        html += htmlPokemonListRender(i, list, listName);
    }
    output.innerHTML = html;
    document.getElementById('content_loading').style.display = "none";
    document.getElementById('div_body').classList.remove('display_none');
    document.getElementById('more_loading').style.display = "none";
    document.getElementById('btn_plus').style.display = "block";
}

function searchInPokemonList() {
    document.getElementById('btn_plus').style.display = "none"
    let value = document.getElementById('search_input').value.toLowerCase().trim();
    if (value.length<3) {
        pokemonListRender(pokemonDB, "pokemonDB");
        return;
    }
    searchPokemonDB = pokemonDB.filter(item => item.de.toLowerCase().includes(value));
    if (searchPokemonDB.length === 0) {
        document.getElementById('pokemon_list').innerHTML = "<p>Leider wurde kein Pokémon gefunden</p>";
        document.getElementById('btn_plus').style.display = "none";
    } else {
        pokemonListRender(searchPokemonDB, "searchPokemonDB");
        document.getElementById('btn_plus').style.display = "none";
    }
}

function pokemonDbMaker() {
    dbForPokemonDB = [];
    for (let i = 0; i < pokemonNameUrl.length; i++) {
        let number = ((i + start) + 1).toString().padStart(4, "0");
        let name = pokemonNameUrl[i].name;
        dbForPokemonDB.push({
            "id": number,
            "name": name,
            "de": pokemonSpecies[i].names[5].name,
            "height": pokemonDetails[i].height,
            "weight": pokemonDetails[i].weight,
            "imageUrl": pokemonDetails[i].sprites.other.home.front_default,
            "types": [],
            "abilities": [],
            "stats": [],
            "story": "",
        });
        pokemonTypesRender(i);
    }
}

function pokemonTypesRender(i) {
    for (let j = 0; j < pokemonTypes[i].length; j++) {
        let typeName = pokemonTypes[i][j].names[4].name;
        dbForPokemonDB[i].types.push(typeName.trim());
    }
}

function saveAbilitiesInPokemonDB() {
    for (let i = 0; i < pokemonAbilities.length; i++) {
        for (let j = 0; j < pokemonAbilities[i].length; j++) {
            dbForPokemonDB[i].abilities.push(pokemonAbilities[i][j].names[4].name);
        }
    }
}

function showPokemonAbilities(i, list) {
    let abilities = "";
    for (let j = 0; j < list[i].abilities.length; j++) {
        abilities += `<li>${list[i].abilities[j]}</li>`;
    }
    return abilities;
}

function saveStatsInPokemonDB() {
    for (let i = 0; i < pokemonDetails.length; i++) {
        for (let j = 0; j < pokemonDetails[i].stats.length; j++) {
            dbForPokemonDB[i].stats.push(pokemonDetails[i].stats[j].base_stat);
        }
    }
}

function savePokemonShortStoryPokemonDB() {
    for (let i = 0; i < pokemonSpecies.length; i++) {
        let output = "";
        for (let j = 0; j < pokemonSpecies[i].flavor_text_entries.length; j++) {
            if (pokemonSpecies[i].flavor_text_entries[j].language.name === "de") {
                output = pokemonSpecies[i].flavor_text_entries[j].flavor_text;
                break;
            }
        }
        dbForPokemonDB[i].story = output;
    }
}

async function showMorePokemonInList() {
    document.getElementById('btn_plus').style.display = "none"
    document.getElementById('more_loading').style.display = "block"
    start += 50;
    await fetchs();
}

function showPokemonTypes(i, list) {
    let types = "";
    for (let j = 0; j < list[i].types.length; j++) {
        types += `<li class="${list[i].types[j]}">${list[i].types[j]}</li>`;
    }
    return types;
}

function showPokemondetailsInRight(i, list) {
    let output = document.getElementById('content_right');
    output.classList = "content_right";
    output.classList.add(`bg${list[i].types[0]}`);
    output.innerHTML = "";
    output.innerHTML = htmlShowPokemondetailsInRight(i, list);
}

function showPokemondetailsInDialog(i, list) {
    document.getElementById('body').classList.add("overflow_hidden");
    let dialog = document.getElementById('dialog');
    dialog.classList.add("dialog");
    dialog.classList.add(`bg${list[i].types[0]}`);
    dialog.style.border = "none";
    dialog.style.borderRadius = "none";
    dialog.classList.remove("dialog_none_mob")
    dialog.innerHTML = htmlShowPokemondetailsInRight(i, list);
    dialog.innerHTML += `
    <img class="exit" onclick="exitDialog()" src="assets/img/icons/exit.png" alt="exit">
    `;
}

function exitDialog(dialog) {
    document.getElementById('dialog').classList = "dialog_none";
    document.getElementById('dialog').classList.add("dialog_none_mob");
    document.getElementById('body').classList.remove("overflow_hidden");
}

function filterRender() {

    let selectFilter = document.getElementById('filter').value;
    if (selectFilter == "all") {
        pokemonListRender(pokemonDB, 'pokemonDB');
    } else {
        pokemonDB.forEach(item => {
            item.types.forEach(data => {
                if (data == selectFilter) {
                    arrayFilter.push(item);
                }
            })
        })
        pokemonListRender(arrayFilter, "arrayFilter");
    }
}