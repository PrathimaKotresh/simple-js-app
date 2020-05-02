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

for (var i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
  if (pokemonList[i].height > 2) {
    document.write(' - Wow, that’s big!')
  }
  document.write('<br>')
}
