
let pokemonRepository= (function () {

let pokemonList = [
  {name: "Pikachu" , height: 0.4, types: "electric", abilities: ["Static", "Lightningrod"]},
  {name: "Poliwag" , height: 0.6, types: "water", abilities: ["Damp","Water-absorb","Swift-swim"]},
  {name: "Sharpedo" , height: 1.8, types: ["dark", "water"], abilities:["Speed-boost", "Rough-skin"] },
  {name: "Abra", height: 0.9, types: "psychic", abilities: ["Synchronize, Inner-focus, Magic-guard"]},
  {name: "Magnemite", height: 0.3, types: ["electric, steel"], abilities: ["Sturdy", "Magnet-pull", "Analytic"] },
]

function getAll() {
  return pokemonList;
}

function add(pokemon) {
  pokemonList.push(pokemon);
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
};

function showDetails(pokemon) {
  console.log(pokemon);
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listElement = document.createElement('li');
  let button = document.createElement('button');
  button.innerText= pokemon.name;
  button.classList.add('pokemonButton');
  listElement.appendChild(button);
  pokemonList.appendChild(listElement);
  button.addEventListener('click', function () {
    showDetails (pokemon) ;
  });

}

})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
