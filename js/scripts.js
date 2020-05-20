// IIFE fuction for pokemon repository
var pokemonRepository = (function() {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  // function to add a pokemon object to pokemon list
  function add(pokemon) {
    pokemonList.push(pokemon);
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

 function showLoadingMessage(){
   var loading = document.querySelector('.loading');
   var para = document.createElement('p');
   para.innerText = 'Loading Data...';
   loading.appendChild(para);
 }

 function hideLoadingMessage(){
   var loading = document.querySelector('.loading');
   var para = document.querySelector('p');
   loading.removeChild(para);
 }

  // function to show all pokemon details in console
  function showDetails(item) {
    loadDetails(item).then(function() {
      console.log(item);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function(response) {
      hideLoadingMessage();
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    var url = item.detailsUrl;
    return fetch(url).then(function(response) {
      hideLoadingMessage();
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    });
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// to add pokemon to buttons
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
