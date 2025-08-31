let pokemonList = [];
let pokemonDetails = [];

async function init() {
    await getPokemonListfromAPI();
    await showAndRenderPokemon();
}

const getPokemonListfromAPI = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
        const data = await response.json();
        pokemonList = data.results;
        await savePokemonDetailseFromUrl();
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const savePokemonDetailseFromUrl = async () => {
    for (let i = 0; i < pokemonList.length; i++) {
        try {
            const response = await fetch(pokemonList[i].url);
            const data = await response.json();
            pokemonDetails.push(data);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
}