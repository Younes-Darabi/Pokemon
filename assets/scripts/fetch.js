let pokemonNameUrl = [];
let pokemonDetails = [];
let pokemonTypes = [];
let pokemonSpecies = [];

async function fetchs() {
    await getPokemonNameUrlFromAPI();
    await getPokemonDetailsFromUrl();
    await getPokemonTypesFromUrl();
    await getPokemonSpeciesFromUrl();
    init();
}

const getPokemonNameUrlFromAPI = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
        const data = await response.json();
        pokemonNameUrl = data.results;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const getPokemonDetailsFromUrl = async () => {
    for (let i = 0; i < pokemonNameUrl.length; i++) {
        try {
            const response = await fetch(pokemonNameUrl[i].url);
            const data = await response.json();
            pokemonDetails.push(data);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
}

const getPokemonTypesFromUrl = async () => {
    for (let i = 0; i < pokemonDetails.length; i++) {
        pokemonTypes[i] = [];
        for (let j = 0; j < pokemonDetails[i].types.length; j++) {
            try {
                const response = await fetch(pokemonDetails[i].types[j].type.url);
                const data = await response.json();
                pokemonTypes[i].push(data);
            } catch (error) {
                console.error("Error:", error.message);
            }
        }
    }
}

const getPokemonSpeciesFromUrl = async () => {
    for (let i = 0; i < pokemonDetails.length; i++) {
            try {
                const response = await fetch(pokemonDetails[i].species.url);
                const data = await response.json();
                pokemonSpecies.push(data);
            } catch (error) {
                console.error("Error:", error.message);
            }
    }
}