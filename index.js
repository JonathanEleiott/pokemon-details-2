// STATE
const state = {
  everyPokemon: [],
  singlePokemonName: ``,
  singlePokemonDetails: {}
}

// DOM SELECTORS
const main = document.querySelector('main');

// FUNCTIONS
const getAllPokemon = async() => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await response.json();
  const allPokemon = data.results;
  state.everyPokemon = allPokemon;
  
  renderAllPokemon();
}

const renderAllPokemon = () => {
  // create an ordered list
  const ol = document.createElement('ol');

  // turn each pokemon into an li with the name inside
  const pokemonNames = state.everyPokemon.map((singlePokemon) => {
    return `<li class="pokemon-name">${singlePokemon.name[0].toUpperCase() + singlePokemon.name.slice(1)}</li>`;
  });

  // put the lis into the ol
  ol.innerHTML = pokemonNames.join('');

  // put the ol in the main element
  main.replaceChildren(ol);

  // grab the LIs
  const pokemonLIs = document.querySelectorAll('li');
  
  // go through all the lis
  pokemonLIs.forEach((pokemonLI) => {
    // add the click event listener
    pokemonLI.addEventListener('click', (event) => {
      state.singlePokemonName = event.target.innerText;
      getSinglePokemonDetails();
    });
  });
}

const getSinglePokemonDetails = async() => {
  // fetch the details for the pokemon that was clicked
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${state.singlePokemonName}`);
  const pokemonDetails = await response.json();
  state.singlePokemonDetails = pokemonDetails;
  renderPokemonDetails();
}

const renderPokemonDetails = () => {
  // console.log(main)
  // console.log(`NAME`, state.singlePokemonName);
  // console.log(`DETAILS`, state.singlePokemonDetails);
  // create HTML for the details
  const detailsHTML = `
    <h2>${state.singlePokemonName}</h2>

    <img src="${state.singlePokemonDetails.sprites.front_default}" alt="pokemon image" />

    <button>back</button>
  `;

  // replace the main children with the details
  main.innerHTML = detailsHTML;

  // grab the back button
  const backButton = document.querySelector('button');
  // add a click event listener to show all the pokemon again
  backButton.addEventListener('click', renderAllPokemon);
}

getAllPokemon();

console.log('TESTING');
