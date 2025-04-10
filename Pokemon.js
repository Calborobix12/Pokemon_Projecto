class Pokemon {
  constructor(name, types, points, specialPower) {
    this.name = name;
    this.types = types || [];
    this.points = points;
    this.specialPower = specialPower;
  }

  displayDetails() {
    return `
      <div class="pokemon-card-inner">
        <img src="images/${this.name}.png" alt="${this.name}" />
        <h3>${this.name}</h3>
        <p>Tipos: ${this.types.join(', ')}</p>
        <p>Puntos: ${this.points}</p>
        <p>Poder especial: ${this.specialPower}</p>
      </div>
    `;
  }
}

class FirePokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Fire'], points, specialPower);
  }
}
class WaterPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Water'], points, specialPower);
  }
}
class GrassPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Grass'], points, specialPower);
  }
}
class ElectricPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Electric'], points, specialPower);
  }
}
class PoisonPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Poison'], points, specialPower);
  }
}
class FlyingPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Flying'], points, specialPower);
  }
}
class BugPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Bug'], points, specialPower);
  }
}
class PsychicPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Psychic'], points, specialPower);
  }
}
class RockPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Rock'], points, specialPower);
  }
}
class GroundPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Ground'], points, specialPower);
  }
}
class IcePokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Ice'], points, specialPower);
  }
}
class DragonPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Dragon'], points, specialPower);
  }
}
class DarkPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Dark'], points, specialPower);
  }
}
class SteelPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Steel'], points, specialPower);
  }
}
class FairyPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Fairy'], points, specialPower);
  }
}
class FightingPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Fighting'], points, specialPower);
  }
}
class GhostPokemon extends Pokemon {
  constructor(name, points, specialPower) {
    super(name, ['Ghost'], points, specialPower);
  }
}

class PokemonList {
  constructor() {
    // Usamos _allPokemons como propiedad interna, para ajustarnos al test.
    this._allPokemons = [];
    this.isLoaded = false;
  }
  
  // Getter para acceder a la lista
  get allPokemons() {
    return this._allPokemons;
  }

  async loadPokemons(data) {
    if (data && Array.isArray(data)) {
      this._allPokemons = data.map(pokemonData => {
        switch (pokemonData.class_type) {
          case 'FirePokemon':
            return new FirePokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'WaterPokemon':
            return new WaterPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'GrassPokemon':
            return new GrassPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'ElectricPokemon':
            return new ElectricPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'PoisonPokemon':
            return new PoisonPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'FlyingPokemon':
            return new FlyingPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'BugPokemon':
            return new BugPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'PsychicPokemon':
            return new PsychicPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'RockPokemon':
            return new RockPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'GroundPokemon':
            return new GroundPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'IcePokemon':
            return new IcePokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'DragonPokemon':
            return new DragonPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'DarkPokemon':
            return new DarkPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'SteelPokemon':
            return new SteelPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'FairyPokemon':
            return new FairyPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'FightingPokemon':
            return new FightingPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          case 'GhostPokemon':
            return new GhostPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
          default:
            return new Pokemon(pokemonData.name, pokemonData.types, pokemonData.points, pokemonData.special_power);
        }
      });
      this.isLoaded = true;
    } else {
      try {
        const response = await fetch('pokemon_data.json');
        const data = await response.json();
        this._allPokemons = data.map(pokemonData => {
          switch (pokemonData.class_type) {
            case 'FirePokemon':
              return new FirePokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'WaterPokemon':
              return new WaterPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'GrassPokemon':
              return new GrassPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'ElectricPokemon':
              return new ElectricPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'PoisonPokemon':
              return new PoisonPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'FlyingPokemon':
              return new FlyingPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'BugPokemon':
              return new BugPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'PsychicPokemon':
              return new PsychicPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'RockPokemon':
              return new RockPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'GroundPokemon':
              return new GroundPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'IcePokemon':
              return new IcePokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'DragonPokemon':
              return new DragonPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'DarkPokemon':
              return new DarkPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'SteelPokemon':
              return new SteelPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'FairyPokemon':
              return new FairyPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'FightingPokemon':
              return new FightingPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            case 'GhostPokemon':
              return new GhostPokemon(pokemonData.name, pokemonData.points, pokemonData.special_power);
            default:
              return new Pokemon(pokemonData.name, pokemonData.types, pokemonData.points, pokemonData.special_power);
          }
        });
        this.isLoaded = true;
      } catch (error) {
        console.error("Error al carregar les dades de Pokémon:", error);
        this.isLoaded = false;
      }
    }
  }

  sortPokemons(criteria, method) {
    const compare = this.getSortCriterion(criteria);
    if (method === 'bubble') {
      this.bubble(compare);
    } else if (method === 'insertion') {
      this.insertion(compare);
    } else if (method === 'selection') {
      this.selection(compare);
    }
  }

  bubble(compare) {
    for (let i = 0; i < this._allPokemons.length - 1; i++) {
      for (let j = 0; j < this._allPokemons.length - 1 - i; j++) {
        if (compare(this._allPokemons[j], this._allPokemons[j + 1]) > 0) {
          [this._allPokemons[j], this._allPokemons[j + 1]] = [this._allPokemons[j + 1], this._allPokemons[j]];
        }
      }
    }
  }

  insertion(compare) {
    for (let i = 1; i < this._allPokemons.length; i++) {
      let j = i;
      while (j > 0 && compare(this._allPokemons[j - 1], this._allPokemons[j]) > 0) {
        [this._allPokemons[j], this._allPokemons[j - 1]] = [this._allPokemons[j - 1], this._allPokemons[j]];
        j--;
      }
    }
  }

  selection(compare) {
    for (let i = 0; i < this._allPokemons.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < this._allPokemons.length; j++) {
        if (compare(this._allPokemons[minIndex], this._allPokemons[j]) > 0) {
          minIndex = j;
        }
      }
      [this._allPokemons[i], this._allPokemons[minIndex]] = [this._allPokemons[minIndex], this._allPokemons[i]];
    }
  }

  getSortCriterion(criteria) {
    if (criteria === 'type') {
      // Comparamos el nombre de la clase (constructor.name)
      return (a, b) => a.constructor.name.localeCompare(b.constructor.name);
    } else if (criteria === 'name') {
      return (a, b) => a.name.localeCompare(b.name);
    } else if (criteria === 'points') {
      return (a, b) => a.points - b.points;
    }
    return (a, b) => (a[criteria] > b[criteria] ? 1 : a[criteria] < b[criteria] ? -1 : 0);
  }

  getPokemonByName(name) {
    return this._allPokemons.find(p => p.name === name);
  }
}


class PokemonTeam {
  // Permet establir els crèdits inicials (per exemple, 750)
  constructor(initialCredits = 750) {
    this.selectedTeam = [];
    this.credits = initialCredits;
    this.maxTeamSize = 6;
  }

  addPokemon(pokemon) {
    if (this.selectedTeam.length >= this.maxTeamSize) return false;
    if (this.credits >= pokemon.points) {
      if (this.selectedTeam.find(p => p.name === pokemon.name)) return false;
      this.selectedTeam.push(pokemon);
      this.credits -= pokemon.points;
      return true;
    } else {
      return false;
    }
  }

  removePokemon(pokemonName) {
    const index = this.selectedTeam.findIndex(pokemon => pokemon.name === pokemonName);
    if (index !== -1) {
      this.credits += this.selectedTeam[index].points;
      this.selectedTeam.splice(index, 1);
    }
  }

  clearTeam() {
    this.selectedTeam = [];
  }

  getTeamDetails() {
    if (this.selectedTeam.length === 0) return "El equip està buit.";
    return this.selectedTeam.map(p => p.name).join(', ');
  }

  getCredits() {
    return this.credits;
  }
}

class PokemonTeamViewModel {
  constructor() {
    this.team = new PokemonTeam();
    this.pokemonList = new PokemonList();
  }

  async loadData() {
    await this.pokemonList.loadPokemons();
  }

  addPokemonToTeam(name) {
    const pokemon = this.pokemonList.allPokemons.find(p => p.name === name);
    if (!pokemon) return false;
    return this.team.addPokemon(pokemon);
  }

  removePokemonFromTeam(name) {
    this.team.removePokemon(name);
  }

  removeAllFromTeam() {
    this.team.clearTeam();
  }

  sortGlobalList(criteria, method) {
    this.pokemonList.sortPokemons(criteria, method);
  }

  getGlobalList() {
    return this.pokemonList.allPokemons;
  }

  getTeamDetails() {
    return this.team.getTeamDetails();
  }

  getCredits() {
    return this.team.getCredits();
  }
}

class PokemonUI {
  constructor(viewModel, jsonUrl = './pokemon_data.json') {
    this.viewModel = viewModel;
    this.jsonUrl = jsonUrl;
    this.gridContainer = null;
    this.teamGrid = null;
    this.creditsDisplay = null;
    this.sortTeamButton = null;
    this.sortOptionsForm = null;
    this.clearTeamButton = null;
  }

  async init() {
    this.cacheDom();
    this.bindEvents();
    await this.viewModel.loadData();
    this.renderGlobalList();
    this.updateCreditsDisplay();
    this.showTeam();
  }

  cacheDom() {
    this.gridContainer = document.getElementById('pokemon-grid');
    this.teamGrid = document.getElementById('selected-team-grid');
    this.creditsDisplay = document.getElementById('credits-display');
    this.sortTeamButton = document.getElementById('sort-team');
    this.sortOptionsForm = document.getElementById('sort-options-form');
    this.clearTeamButton = document.getElementById('clear-team');
  }

  bindEvents() {
    if (this.sortTeamButton) {
      this.sortTeamButton.addEventListener('click', () => this.handleSortOptions());
    }
    if (this.clearTeamButton) {
      this.clearTeamButton.addEventListener('click', () => {
        this.viewModel.removeAllFromTeam();
        this.updateCreditsDisplay();
        this.renderGlobalList();
        this.showTeam();
      });
    }
    if (this.gridContainer) {
      this.gridContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.pokemon-card');
        if (card) {
          this.toggleSelection(card);
        }
      });
    }
  }

  renderGlobalList() {
    if (!this.gridContainer) return;
    this.gridContainer.innerHTML = '';
    const pokemons = this.viewModel.getGlobalList();
    pokemons.forEach(pokemon => {
      const card = document.createElement('div');
      card.classList.add('pokemon-card');
      card.dataset.pokemon = pokemon.name;
      card.innerHTML = `
        <img src="images/${pokemon.name}.png" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <p>Tipos: ${pokemon.types.join(', ')}</p>
        <p>Puntos: ${pokemon.points}</p>
        <p>Poder especial: ${pokemon.specialPower}</p>
      `;
      if (this.isPokemonInTeam(pokemon.name)) {
        card.classList.add('selected');
      }
      this.gridContainer.appendChild(card);
    });
  }

  toggleSelection(card) {
    const pokemonName = card.dataset.pokemon;
    if (this.isPokemonInTeam(pokemonName)) {
      this.viewModel.removePokemonFromTeam(pokemonName);
      card.classList.remove('selected');
    } else {
      const agregado = this.viewModel.addPokemonToTeam(pokemonName);
      if (agregado) {
        card.classList.add('selected');
      }
    }
    this.updateCreditsDisplay();
    this.showTeam();
  }

  showTeam() {
    if (!this.teamGrid) return;
    this.teamGrid.innerHTML = '';
    const teamMembers = this.viewModel.team.selectedTeam;
    if (teamMembers.length === 0) {
      this.teamGrid.innerHTML = `<p>El equip està buit.</p>`;
      return;
    }
    teamMembers.forEach(pokemon => {
      const card = document.createElement('div');
      card.classList.add('pokemon-card');
      card.innerHTML = `
        <img src="images/${pokemon.name}.png" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <p>Tipos: ${pokemon.types.join(', ')}</p>
        <p>Puntos: ${pokemon.points}</p>
        <p>Poder especial: ${pokemon.specialPower}</p>
      `;
      this.teamGrid.appendChild(card);
    });
  }

  handleSortOptions() {
    const criteria = this.sortOptionsForm.querySelector('input[name="sort-criteria"]:checked').value;
    const method = this.sortOptionsForm.querySelector('input[name="sort-method"]:checked').value;
    this.viewModel.sortGlobalList(criteria, method);
    this.renderGlobalList();
  }

  updateCreditsDisplay() {
    if (this.creditsDisplay) {
      this.creditsDisplay.textContent = `Crèdits disponibles: ${this.viewModel.getCredits()}`;
    }
  }

  isPokemonInTeam(name) {
    return this.viewModel.team.selectedTeam.some(p => p.name === name);
  }
}

class Player {
  constructor(name, team) {
    this.name = name;
    this.team = team; // Se espera que 'team' tenga la propiedad 'selectedTeam'
  }

  getTotalSpecialPower() {
    const teamArray = this.team.selectedTeam || [];
    return teamArray.reduce((sum, p) => sum + p.specialPower, 0);
  }
}

// Función para la batalla dinámica estilo Pokémon con 500 de vida y actualización de cartas
function dynamicBattle(player1, player2, team1Display, team2Display, battleLog, attackButton) {
  const initialHP = 500; // 500 de vida para cada Pokémon

  // Asignar HP inicial a cada Pokémon
  player1.team.selectedTeam.forEach(pokemon => {
    pokemon.hp = initialHP;
  });
  player2.team.selectedTeam.forEach(pokemon => {
    pokemon.hp = initialHP;
  });

  let currentIndex1 = 0;
  let currentIndex2 = 0;

  // Función auxiliar para renderizar el estado de un equipo en su contenedor, mostrando el nombre del jugador
  function renderTeamDisplay(container, team, playerName) {
    // Limpiamos el contenedor y añadimos el nombre del jugador
    container.innerHTML = `<h3>${playerName}</h3>`;
    // Creamos un div que usaremos como grilla para las cartas
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("team-grid");
    team.forEach(pokemon => {
      const card = document.createElement("div");
      card.classList.add("pokemon-card");
      if (pokemon.hp <= 0) {
        card.classList.add("defeated");
      }
      card.innerHTML = `
        <img src="images/${pokemon.name}.png" alt="${pokemon.name}" />
        <h4>${pokemon.name}</h4>
        <p>Vida: ${pokemon.hp > 0 ? pokemon.hp : 0} / ${initialHP}</p>
        <p>Daño: ${pokemon.specialPower}</p>
      `;
      gridDiv.appendChild(card);
    });
    container.appendChild(gridDiv);
  }

  // Render inicial de ambos equipos con los nombres de los jugadores
  renderTeamDisplay(team1Display, player1.team.selectedTeam, player1.name);
  renderTeamDisplay(team2Display, player2.team.selectedTeam, player2.name);

  // Función para actualizar el log de batalla
  function updateBattleLog(message) {
    const p = document.createElement("p");
    p.textContent = message;
    battleLog.appendChild(p);
    battleLog.scrollTop = battleLog.scrollHeight;
  }

  // Comprueba si la batalla ha finalizado
  function checkBattleOver() {
    if (currentIndex1 >= player1.team.selectedTeam.length) {
      updateBattleLog(`¡${player2.name} gana la batalla!`);
      attackButton.disabled = true;
      return true;
    }
    if (currentIndex2 >= player2.team.selectedTeam.length) {
      updateBattleLog(`¡${player1.name} gana la batalla!`);
      attackButton.disabled = true;
      return true;
    }
    return false;
  }

  attackButton.addEventListener("click", () => {
    if (checkBattleOver()) return;

    let attacker = player1.team.selectedTeam[currentIndex1];
    let defender = player2.team.selectedTeam[currentIndex2];

    // Ataque del jugador 1
    updateBattleLog(`${attacker.name} ataca a ${defender.name} y hace ${attacker.specialPower} puntos de daño.`);
    defender.hp -= attacker.specialPower;
    if (defender.hp <= 0) {
      updateBattleLog(`${defender.name} ha sido derrotado!`);
      renderTeamDisplay(team2Display, player2.team.selectedTeam, player2.name);
      currentIndex2++;
      if (currentIndex2 < player2.team.selectedTeam.length) {
        updateBattleLog(`${player2.name} envía a ${player2.team.selectedTeam[currentIndex2].name} al combate.`);
      }
      if (checkBattleOver()) return;
    } else {
      renderTeamDisplay(team2Display, player2.team.selectedTeam, player2.name);
    }

    // Contraataque del defensor
    updateBattleLog(`${defender.name} contraataca a ${attacker.name} y hace ${defender.specialPower} puntos de daño.`);
    attacker.hp -= defender.specialPower;
    if (attacker.hp <= 0) {
      updateBattleLog(`${attacker.name} ha sido derrotado!`);
      renderTeamDisplay(team1Display, player1.team.selectedTeam, player1.name);
      currentIndex1++;
      if (currentIndex1 < player1.team.selectedTeam.length) {
        updateBattleLog(`${player1.name} envía a ${player1.team.selectedTeam[currentIndex1].name} al combate.`);
      }
      if (checkBattleOver()) return;
    } else {
      renderTeamDisplay(team1Display, player1.team.selectedTeam, player1.name);
    }
  });
}




// Evento DOMContentLoaded para la parte de selección de equipo
document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.includes("battle.html")) {
    // La inicialización de la batalla dinámica se realiza en battle.html
  } else {
    const player1Name = localStorage.getItem("player1Name");
    const player2Name = localStorage.getItem("player2Name") || "CPU";
    const isTwoPlayer = localStorage.getItem("isTwoPlayer") === "true";

    const viewModel1 = new PokemonTeamViewModel();
    const viewModel2 = new PokemonTeamViewModel();
    let currentViewModel = viewModel1;

    const ui = new PokemonUI(currentViewModel);
    await ui.init();

    viewModel2.pokemonList = viewModel1.pokemonList;

    const teamSelectionSection = document.getElementById("team-selection-section");
    const currentPlayerSelection = document.getElementById("current-player-selection");
    const nextPlayerButton = document.getElementById("next-player-button");
    const startBattleButton = document.getElementById("start-battle-button");

    teamSelectionSection.style.display = "block";

    if (isTwoPlayer) {
      currentPlayerSelection.textContent = `${player1Name}, selecciona els teus Pokémon`;
      nextPlayerButton.addEventListener("click", () => {
        if (currentViewModel.team.selectedTeam.length === 0) {
          alert(`${currentViewModel === viewModel1 ? player1Name : player2Name}, selecciona almenys un Pokémon.`);
          return;
        }
        if (currentViewModel === viewModel1) {
          currentViewModel = viewModel2;
          currentPlayerSelection.textContent = `${player2Name}, selecciona els teus Pokémon`;
          ui.viewModel = currentViewModel;
          ui.renderGlobalList();
        } else {
          teamSelectionSection.style.display = "none";
        }
      });
    } else {
      nextPlayerButton.addEventListener("click", () => {
        if (currentViewModel.team.selectedTeam.length === 0) {
          alert(`${player1Name}, selecciona almenys un Pokémon.`);
          return;
        }
        viewModel2.team.selectedTeam = [];
        const allPokemons = ui.viewModel.pokemonList.allPokemons;
        const availablePokemons = allPokemons.filter(p => !viewModel1.team.selectedTeam.some(x => x.name === p.name));
        availablePokemons.sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(6, availablePokemons.length); i++) {
          viewModel2.team.addPokemon(availablePokemons[i]);
        }
        alert("¡Equip de la CPU seleccionat automàticament!");
        teamSelectionSection.style.display = "none";
      });
    }

    startBattleButton.addEventListener("click", () => {
      if (viewModel1.team.selectedTeam.length === 0) {
        alert("Jugador 1 ha de seleccionar almenys un Pokémon.");
        return;
      }
      if (isTwoPlayer && viewModel2.team.selectedTeam.length === 0) {
        alert("Jugador 2 ha de seleccionar almenys un Pokémon.");
        return;
      }
      localStorage.setItem("team1", JSON.stringify(viewModel1.team.selectedTeam));
      localStorage.setItem("team2", JSON.stringify(viewModel2.team.selectedTeam));
      window.location.href = "battle.html";
    });
  }
});
