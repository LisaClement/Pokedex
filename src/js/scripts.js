/* eslint-env jquery */

let pokemonRepository = (function() {
  //Pokemon API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonList = [];

  //Make the API call to load in the pokemon list
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            types: item.types
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //API call to load details when pokemon is clicked on
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = parseTypes(details.types);
      })
      .catch(function(e) {
        console.error(e);
        console.log(loadDetails);
      });
  }

  //add a function to create buttons which display each pokemon in HTML
  function addListItem(pokemon) {
    //select elements
    let pokemonList = document.querySelector('.pokemon-list');
    let listElement = document.createElement('li');
    let button = document.createElement('button');

    //add bootstrap classes to button
    button.classList.add('btn');
    button.classList.add('btn-primary');

    //add a Bootsrap' list class to style <li> elements
    listElement.classList.add('list-group-item');

    //add text, class & attributes to button
    button.innerText = pokemon.name;
    button.classList.add('pokemonButton');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modalContainer');

    //add button as a list item
    listElement.appendChild(button);
    //add list item to the pokemon list
    pokemonList.appendChild(listElement);

    //Event listener showing pokemon details when button is clicked
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  //displays all pokemon details in the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
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
    return parsed;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    //clear existing content of the modal
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let pokemonName = $('<h1>' + pokemon.name + '</h1>');
    // creating images in modal content
    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    pokemonImage.attr('src', pokemon.imageUrl);
    //creating element for height in modal content
    let pokemonHeight = $('<p>' + 'height : ' + pokemon.height + '</p>');
    //creating element for weight in modal content
    let pokemonWeight = $('<p>' + 'weight : ' + pokemon.weight + '<p>');
    //creating element for type in modal content
    let pokemonTypes = $('<p>' + 'type : ' + pokemon.types + '</p>');

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);

    console.log('reached here');
  }
  //object keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();
//IIFE End

//calling out functions
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
