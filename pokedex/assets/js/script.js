const input = document.getElementById('pokemon-input');
const button = document.getElementById('search-btn');
const card = document.getElementById('pokemon-card');
const errorMessage = document.getElementById('error-message');

const img = document.getElementById('pokemon-img');
const nameEl = document.getElementById('pokemon-name');
const typeEl = document.getElementById('pokemon-type');
const heightEl = document.getElementById('pokemon-height');
const weightEl = document.getElementById('pokemon-weight');
const statsEl = document.getElementById('pokemon-stats');

button.addEventListener('click', () => {
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  fetchPokemon(query);
});

async function fetchPokemon(pokemon) {
  try {
    errorMessage.classList.add('hidden');
    card.classList.add('hidden');

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!res.ok) {
      throw new Error('Pokémon não encontrado');
    }

    const data = await res.json();

    showPokemon(data);

  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}

function showPokemon(data) {
  img.src = data.sprites.front_default || '';
  img.alt = data.name;

  nameEl.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  typeEl.textContent = 'Tipo: ' + data.types.map(t => t.type.name).join(', ');
  heightEl.textContent = `Altura: ${data.height / 10} m`;
  weightEl.textContent = `Peso: ${data.weight / 10} kg`;

  statsEl.innerHTML = '';
  data.stats.forEach(stat => {
    const statDiv = document.createElement('div');
    statDiv.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    statsEl.appendChild(statDiv);
  });

  card.classList.remove('hidden');
}
