let pokemonDB = [];
let dbForPokemonDB = [];
let searchPokemonDB = [];
let arrayFilter = [];
let myList = [];

function init() {
    pokemonDbMaker();
    pokemonDB.push(...dbForPokemonDB);
    savePokemonShortStoryPokemonDB();
    saveAbilitiesInPokemonDB();
    saveStatsInPokemonDB();
    pokemonListRender(pokemonDB, 'pokemonDB');
    showPokemondetailsInRight(0, pokemonDB);
}

function searchInPokemonList() {
    const searchInput = document.getElementById('search_input');
    const btnPlus = document.getElementById('btn_plus');
    const pokemonList = document.getElementById('pokemon_list');
    const value = searchInput.value.toLowerCase().trim();
    if (value.length >= 3) {
        searchPokemonDB = (arrayFilter.length != 0) ? arrayFilter : pokemonDB;
        const results = searchPokemonDB.filter(item => item.de.toLowerCase().includes(value));
        if (results.length == 0) {
            pokemonList.innerHTML = "<p>Leider wurde kein Pokémon gefunden</p>";
        } else {
            pokemonListRender(results, "searchPokemonDB");
        }
        btnPlus.style.display = "none";
    } else if (arrayFilter.length > 0) {
        pokemonListRender(arrayFilter, 'arrayFilter');
    } else {
        pokemonListRender(pokemonDB, 'pokemonDB');
    }
}

function deleteSearch() {
    document.getElementById('search_input').value = "";
    if (arrayFilter.length > 0) {
        pokemonListRender(arrayFilter, 'arrayFilter');
    } else {
        pokemonListRender(pokemonDB, 'pokemonDB');
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
            "imageUrl": pokemonDetails[i].sprites.other.dream_world.front_default,
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
    myList = list;
    document.getElementById('body').classList.add("overflow_hidden");
    let dialog = document.getElementById('dialog');
    dialog.classList.add("dialog");
    dialog.classList.add(`bg${list[i].types[0]}`);
    dialog.style.border = "none";
    dialog.style.borderRadius = "none";
    dialog.classList.remove("dialog_none_mob")
    dialog.innerHTML = htmlShowPokemondetailsInRight(i, list);
    dialog.innerHTML += htmlBtnExitBackNext(i);
}

function btnNext(i) {
    if (++i < myList.length) {
        showPokemondetailsInDialog(i, myList)
    }
}

function btnBack(i) {
    if (i >= 1) {
        i--;
        showPokemondetailsInDialog(i, myList)
    }
}

function exitDialog(dialog) {
    document.getElementById('dialog').classList = "dialog_none";
    document.getElementById('dialog').classList.add("dialog_none_mob");
    document.getElementById('body').classList.remove("overflow_hidden");
}

function filterRender() {
    let selectFilter = document.getElementById('filter').value;
    if (!document.getElementById(selectFilter)) {
        pokemonDB.forEach(item => {
            item.types.forEach(data => {
                if (data == selectFilter) {
                    arrayFilter.push(item);
                }
            })
        })
        pokemonListRender(arrayFilter, "arrayFilter");
        let ShowFilter = document.getElementById('pokemon_filter');
        ShowFilter.innerHTML += htmlShowFilter(selectFilter);
    }
}

function singleFilterDelete(selectFilter) {
    if (selectFilter != 'all') {
        for (let i = arrayFilter.length; i >= 0; i--) {
            arrayFilter.forEach(element => {
                element.types.forEach(type => {
                    if (type == selectFilter) {
                        arrayFilter.splice(arrayFilter.indexOf(element), 1);
                    }
                })
            });
        }
    }
    pokemonListRender(arrayFilter, "arrayFilter");
    if (arrayFilter.length == 0) {
        pokemonListRender(pokemonDB, 'pokemonDB');
        document.getElementById('pokemon_filter').innerHTML = "";
        document.getElementById('filter').value = "all";
    }
    let divId = document.getElementById(selectFilter);
    divId.remove();
}

function deleteFilter() {
    arrayFilter = [];
    document.getElementById('filter').value = "all";
    pokemonListRender(pokemonDB, 'pokemonDB');
    document.getElementById('pokemon_filter').innerHTML = "";
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
    document.getElementById('footer').classList.remove('display_none');
    document.getElementById('header').classList.remove('display_none');
    document.getElementById('more_loading').style.display = "none";
    document.getElementById('btn_plus').style.display = "block";
}