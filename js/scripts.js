var pokemonRepository = (function() {
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

  function add(pokemon) {
    if (typeof pokemon === Object && Object.keys(pokemon) === ['name', 'height', 'types', 'weight']) {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
  if (pokemon.height > 2) {
    document.write(' - Wow, that’s big!');
  }
  document.write('<br>');
})
