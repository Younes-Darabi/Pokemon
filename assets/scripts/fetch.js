let pokemonNameUrl = [];
let pokemonDetails = [];
let pokemonTypes = [];
let pokemonSpecies = [];
let pokemonAbilities = [];
let pokemonEvolution = [];
let start = 0;

async function fetchs() {
  await getPokemonNameUrlFromAPI();
  await getPokemonDetailsFromUrl();
  await getPokemonTypesFromUrl();
  await getPokemonSpeciesFromUrl();
  await getPokemonAbilitiesFromUrl();
  await getPokemonEvolutionFromUrl();
  init();
}

async function getPokemonNameUrlFromAPI() {
  pokemonNameUrl = [];
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${start}`);
    const data = await response.json();
    pokemonNameUrl = data.results;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function getPokemonDetailsFromUrl() {
  pokemonDetails = [];
  try {
    const promises = pokemonNameUrl.map(p =>
      fetch(p.url).then(res => res.json())
    );
    const results = await Promise.all(promises);
    results.forEach(data => pokemonDetails.push(data));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function getPokemonTypesFromUrl() {
  pokemonTypes = [];
  try {
    for (let i = 0; i < pokemonDetails.length; i++) {
      const promises = pokemonDetails[i].types.map(t =>
        fetch(t.type.url).then(res => res.json())
      );
      const typesData = await Promise.all(promises);
      pokemonTypes[i] = typesData;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function getPokemonSpeciesFromUrl() {
  pokemonSpecies = [];
  try {
    const promises = pokemonDetails.map(p =>
      fetch(p.species.url).then(res => res.json())
    );
    const results = await Promise.all(promises);
    results.forEach(data => pokemonSpecies.push(data));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function getPokemonAbilitiesFromUrl() {
  pokemonAbilities = [];
  try {
    for (let i = 0; i < pokemonDetails.length; i++) {
      const promises = pokemonDetails[i].abilities.map(a =>
        fetch(a.ability.url).then(res => res.json())
      );
      const abilitiesData = await Promise.all(promises);
      pokemonAbilities[i] = abilitiesData;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function getPokemonEvolutionFromUrl() {
  pokemonEvolution = [];
  try {
    let response = pokemonSpecies.map(async item => {
      let datas = await fetch(item.evolution_chain.url);
      return await datas.json();
    });
    pokemonEvolution = await Promise.all(response);
  } catch (error) {
    console.error("Error:", error.message);
  }
}