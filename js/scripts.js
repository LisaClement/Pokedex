
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let pokemonList = [];

let pokemonRepository= (function () {
  //Make the API call to load in the pokemon list
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
      }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          types: item.types
          }; add(pokemon); });
        }).catch(function (e) {
          console.error(e);
        })
      }

  //API call to load details when pokemon is clicked on
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
    return response.json();
      }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = parseTypes(details.types);
    }).catch(function (e) {
    console.error(e);
    });
    }

  function addListItem(pokemon) {
    //Adds a <li> with a child <button class="pokemon-button" list-group-item> to the parent <ul class="pokemon-list">
    let pokemonList = document.querySelector('.pokemon-list');
    let listElement = document.createElement('li');
    listElement.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText= pokemon.name;
    button.classList.add('pokemonButton');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modalContainer');
    listElement.appendChild(button);
    pokemonList.appendChild(listElement);
    //Event listener showing pokemon details when button is clicked
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  //displays all pokemon details in the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  //return the entire pokemon list
  function getAll() {
    return pokemonList;
  }

  function parseTypes(types) {
      let parsed = [];
      types.forEach(function(type) {
      parsed.push(type.type.name);
        });
        return parsed;}

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  let modalContainer = document.querySelector('#modalContainer');

  function showModal(title, text, imageUrl) {
    //clear existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    //add the new content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.classList.add('image-element');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    //pokemon sprite added to modal
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modalContainer');
    modalContainer.classList.remove('is-visible');
  }

  //Closes modal when you hit the esc key
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modalContainer');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Closes the modal when you click outside of it
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //object keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();
//IIFE End

//calling out functions
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
