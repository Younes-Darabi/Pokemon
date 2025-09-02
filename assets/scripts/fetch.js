let pokemonNameUrl = [];
let pokemonDetails = [];
let pokemonTypes = [];
let pokemonSpecies = [];
let pokemonAbilities = [];

let start = 0;

async function fetchs() {
    await getPokemonNameUrlFromAPI();
    await getPokemonDetailsFromUrl();
    await getPokemonTypesFromUrl();
    await getPokemonSpeciesFromUrl();
    await getPokemonAbilitiesFromUrl();
    init();
}

const getPokemonNameUrlFromAPI = async () => {
    pokemonNameUrl = [];
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${start}`);
        const data = await response.json();
        pokemonNameUrl = data.results;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const getPokemonDetailsFromUrl = async () => {
    pokemonDetails = [];
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
    pokemonTypes = [];
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
    pokemonSpecies = [];
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

const getPokemonAbilitiesFromUrl = async () => {
    pokemonAbilities = [];
    for (let i = 0; i < pokemonDetails.length; i++) {
        pokemonAbilities[i] = [];
        for (let j = 0; j < pokemonDetails[i].abilities.length; j++) {
            try {
                const response = await fetch(pokemonDetails[i].abilities[j].ability.url);
                const data = await response.json();
                pokemonAbilities[i].push(data);
            } catch (error) {
                console.error("Error:", error.message);
            }
        }
    }
}