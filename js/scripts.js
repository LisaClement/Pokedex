let pokemonList = [
  {name: "Pikachu" , height: 0.4, types: "electric", abilities: ["Static", "Lightningrod"]},
  {name: "Poliwag" , height: 0.6, types: "water", abilities: ["Damp","Water-absorb","Swift-swim"]},
  {name: "Abra", height: 0.9, types: "psychic", abilities: ["Synchronize, Inner-focus, Magic-guard"]},
  {name: "Magnemite", height: 0.3, types: ["electric, steel"], abilities: ["Sturdy", "Magnet-pull", "Analytic"] },
  {name: "Sharpedo" , height: 1.8, types: ["dark", "water"], abilities:["Speed-boost", "Rough-skin"] },
]

let text= "";
for (let i = 0; pokemonList[i];  i++) {
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
}
