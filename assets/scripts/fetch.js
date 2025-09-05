let pokemonNameUrl = [];
let pokemonDetails = [];
let pokemonTypes = [];
let pokemonSpecies = [];
let pokemonAbilities = [];
let start = 0;

async function fetchs() {
  await getPokemonNameUrlFromAPI(start);
  await getPokemonDetailsFromUrl();
  await getPokemonTypesFromUrl();
  await getPokemonSpeciesFromUrl();
  await getPokemonAbilitiesFromUrl();
  init();
}

async function getPokemonNameUrlFromAPI(start) {
  pokemonNameUrl = [];
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${start}`);
    const data = await response.json();
    pokemonNameUrl = data.results;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function getPokemonDetailsFromUrl() {
  pokemonDetails = [];
  try {
    const datas = await Promise.all(
      pokemonNameUrl.map(async item => {
        const response = await fetch(item.url);
        return await response.json();
      })
    );
    pokemonDetails = datas;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function getPokemonTypesFromUrl() {
  pokemonTypes = [];
  try {
    pokemonTypes = await Promise.all(
      pokemonDetails.map(async item => {
        return await Promise.all(
          item.types.map(async sItem => {
            const response = await fetch(sItem.type.url);
            return await response.json();
          }))
      }
      )
    )
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function getPokemonSpeciesFromUrl() {
  pokemonSpecies = [];
  try {
    pokemonSpecies = await Promise.all(
      pokemonDetails.map(async item => {
        const response = await fetch(item.species.url);
        return await response.json();
      })
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function getPokemonAbilitiesFromUrl() {
  pokemonAbilities = [];
  try {
    pokemonAbilities = await Promise.all(
      pokemonDetails.map(async item => {
        return await Promise.all(
          item.abilities.map(async sItem => {
            const response = await fetch(sItem.ability.url);
            return await response.json();
          }))
      }
      )
    )
  } catch (error) {
    console.error("Error:", error.message);
  }
};