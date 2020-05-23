// IIFE fuction for pokemon repository
var pokemonRepository = (function() {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  var $modalContainer = document.querySelector('#modal-container');

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

  // function to show loading message
  function showLoadingMessage() {
    var loading = document.querySelector('.loading');
    var para = document.createElement('p');
    para.innerText = 'Loading Data...';
    loading.appendChild(para);
  }

  // funtion to hide loading message
  function hideLoadingMessage() {
    var loading = document.querySelector('.loading');
    var para = document.querySelector('p');
    loading.removeChild(para);
  }

  // function to open a modal to show pokemon details
  function showModal(title, pokemon) {
    // Clear all existing modal content
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    // add title element
    var titleElement = document.createElement('h1');
    titleElement.innerText = title;

    // add name element
    var nameElement = document.createElement('p');
    nameElement.innerText = 'Name: ' + pokemon.name;

    // add height element
    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    // add image element
    var imageElement = document.createElement('IMG');
    imageElement.setAttribute("src", pokemon.imageUrl);
    imageElement.setAttribute("width", "200");
    imageElement.setAttribute("height", "200");
    imageElement.setAttribute("alt", pokemon.name);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  var dialogPromiseReject; // This can be set later, by showDialog

  // function to hide model
  function hideModal() {
    var modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  // add escape event to close the model
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  $modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  // function to show all pokemon details in console
  function showDetails(item) {
    loadDetails(item).then(function() {
      console.log(item);
      showModal('Pokemon Details', item);
    });
  }

  // function to fetch pokemon list from backend api and add to pokemon list
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
