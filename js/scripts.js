var pokemonRepository = (function () {
  var pokemonList = [{
      name: 'Pikachu',
      height: 0.4,
      types: ['electric'],
      Weight: 6
    },
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison'],
      Weight: 6.9
    },
    {
      name: 'Charizard',
      height: 1.7,
      types: ['fire', 'flying'],
      Weight: 90.5
    },
    {
      name: 'Venusaur',
      height: 2,
      types: ['grass', 'poison'],
      Weight: 100
    },
    {
      name: 'Dragonite',
      height: 2.2,
      types: ['dragon', 'flying'],
      Weight: 210
    }
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.getAll().forEach(function(pokemon){
  document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
  if (pokemon.height > 2) {
    document.write(' - Wow, that’s big!')
  }
  document.write('<br>')
})
