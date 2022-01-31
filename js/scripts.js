

let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
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
  //Adds a <li> with a child <button class="pokemon-button"> to the parent <ul class="pokemon-list">
      let pokemonList = document.querySelector('.pokemon-list');
      let listElement = document.createElement('li');
      let button = document.createElement('button');
      button.innerText= pokemon.name;
      button.classList.add('pokemonButton');
      listElement.appendChild(button);
      pokemonList.appendChild(listElement);
     //Add an event listener to log pokemon info when button is clicked
      button.addEventListener('click', function () {
        showDetails (pokemon)});
      }

//displays all details in the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
    }

    //return entire list
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


  //object keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadDetails: loadDetails,
    loadList: loadList,
  };
  }) ();
  //IIFE End


  //calling out functions
  pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
      });
    });
