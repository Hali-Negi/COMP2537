let offset = 0;
const limit = 10;

document.addEventListener("DOMContentLoaded", () => {
  loadPokemon();
});

async function loadPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();

  for (let p of data.results) {
    const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
    const pokeData = await res2.json();
    displayPokemon(pokeData);
  }

  offset += limit;
}

function displayPokemon(pokeData) {
  const container = document.getElementById("pokemon-container");

  const card = document.createElement("div");
  card.className = "col-6 col-sm-4 col-md-3 col-lg-2";

  card.innerHTML = `
    <div class="card shadow-sm">
      <img src="${pokeData.sprites.other["official-artwork"].front_default}" 
           class="card-img-top" alt="${pokeData.name}" />
      <div class="card-body text-center">
        <h6 class="card-title text-capitalize">${pokeData.name}</h6>
      </div>
    </div>
  `;

  container.appendChild(card);
}

window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadPokemon();
  }
});
