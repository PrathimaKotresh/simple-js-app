// IIFE fuction for pokemon repository
var pokemonRepository = (function() {
  // variable containing list of pokemon objects
  var pokemonList = [{
      name: 'Pikachu',
      height: 0.4,
      types: ['electric'],
      weight: 6
    },
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison'],
      weight: 6.9
    },
    {
      name: 'Charizard',
      height: 1.7,
      types: ['fire', 'flying'],
      weight: 90.5
    },
    {
      name: 'Venusaur',
      height: 2,
      types: ['grass', 'poison'],
      weight: 100
    },
    {
      name: 'Dragonite',
      height: 2.2,
      types: ['dragon', 'flying'],
      weight: 210
    }
  ];

  // function to add a pokemon object to pokemon list
  function add(pokemon) {
    if (typeof pokemon === Object && Object.keys(pokemon) === ['name', 'height', 'types', 'weight']) {
      pokemonList.push(pokemon);
    }
  }

  // function to return pokemon list
  function getAll() {
    return pokemonList;
  }

  // funtion to create list of button to each pokemon in frontend
  function addListItem(pokemon) {
    var list = document.querySelector('ul');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonButton');
    listItem.appendChild(button);
    list.appendChild(listItem);
    clickShowDetailsButton(button, pokemon);
  }

  // function to handle pokemon button click to show pokemon details
  function clickShowDetailsButton(button, pokemon) {
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  // function to show all pokemon details in console
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };


})();

// to add pokemon to buttons
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
})
