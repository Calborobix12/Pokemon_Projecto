const { createApp } = Vue; // Se obtiene createApp de la variable global de Vue

import PokemonCard from './PokemonCard.js';
import { PokemonTeamViewModel } from '../viewModel.js';

const App = {
  components: {
    'pokemon-card': PokemonCard
  },
  template: /*html*/ `
    <div>
      <!-- Configuració dels jugadors -->
      <section v-if="currentScreen === 'setup'" class="setup-container">
        <h2 class="setup-title">Configuració dels Jugadors</h2>
        <p class="setup-instruccions">Introdueix els noms dels jugadors per començar el joc.</p>
        <div class="toggle-container">
          <label for="two-players-toggle">Dos Jugadors:</label>
          <label class="switch">
            <input type="checkbox" v-model="isTwoPlayers" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="player-input-group">
          <label for="player1-name" class="player-label">Nom del Jugador 1:</label>
          <input type="text" v-model="player1Name" class="player-input" required />
        </div>
        <div class="player-input-group" v-if="isTwoPlayers">
          <label for="player2-name" class="player-label">Nom del Jugador 2:</label>
          <input type="text" v-model="player2Name" class="player-input" required />
        </div>
        <button @click="startGame" class="setup-button">Següent</button>
      </section>

      <!-- Selecció d'equip -->
      <section v-if="currentScreen === 'teamSelection'" id="team-selection-section">
        <h2>Selecciona el teu Equip</h2>
        <h2>{{ currentPlayerSelectionMessage }}</h2>        
        <h2 id="credits-display">
          Crèdits restants: <span id="credits-value">{{ creditsDisplay }}</span>
        </h2>
        <div id="team-section">
          <div id="selected-team-grid" class="grid-container">
            <pokemon-card
              v-for="(poke, index) in currentPlayerTeam"
              :key="index"
              :pokemon="poke"
              :is-selected="isPokemonInTeam(poke.name)"
              @toggle-selection="handleToggleSelection"
            />
          </div>
        </div>
        <button id="next-player-button" @click="handleNextPlayer">
          {{ buttonLabel }}
        </button>
        <!-- Opcions d'ordenació -->
        <div id="sort-options-section">
          <h2>Opcions d'Ordenació</h2>
          <form id="sort-options-form">
            <fieldset>
              <legend>Ordena per:</legend>
              <label>
                <input type="radio" name="sort-criteria" value="name" v-model="sortCriteria" />
                Nom
              </label>
              <label>
                <input type="radio" name="sort-criteria" value="points" v-model="sortCriteria" />
                Punts
              </label>
              <label>
                <input type="radio" name="sort-criteria" value="type" v-model="sortCriteria" />
                Tipus
              </label>
            </fieldset>
            <fieldset>
              <legend>Mètode d'ordenació:</legend>
              <label>
                <input type="radio" name="sort-method" value="bubble" v-model="sortMethod" />
                Bombolla
              </label>
              <label>
                <input type="radio" name="sort-method" value="insertion" v-model="sortMethod" />
                Inserció
              </label>
              <label>
                <input type="radio" name="sort-method" value="selection" v-model="sortMethod" />
                Selecció
              </label>
            </fieldset>
            <button type="button" id="sort-team" @click="handleSortOptions">
              Ordenar
            </button>
          </form>
        </div>
        <div id="pokemon-grid" class="grid-container">
          <pokemon-card
            v-for="(poke, index) in globalPokemonList"
            :key="index"
            :pokemon="poke"
            :is-selected="isPokemonInTeam(poke.name)"
            @toggle-selection="handleToggleSelection"
          />
        </div>
      </section>

      <!-- Vista de equips (mostrada en la batalla) -->
      <section id="teams-overview-section" v-if="currentScreen === 'battle'">
        <h3 id="player1-team-name">{{ viewModel.player1.getName() }}'s Team</h3>
        <div id="player1-team-display" class="player1-selected-team-grid">
          <pokemon-card
            v-for="(poke, index) in viewModel.player1.team.selectedTeam"
            :key="index"
            :pokemon="poke"
            :is-selected="true"
          />
        </div>
        <h3 id="player2-team-name">{{ viewModel.player2.getName() }}'s Team</h3>
        <div id="player2-team-display" class="player2-selected-team-grid">
          <pokemon-card
            v-for="(poke, index) in viewModel.player2.team.selectedTeam"
            :key="index"
            :pokemon="poke"
            :is-selected="true"
          />
        </div>
      </section>

      <!-- Arena de batalla -->
      <section id="battle-arena-section" v-if="currentScreen === 'battle'" style="display: flex">
        <div class="battle-container">
          <div id="pokemon1-display" class="pokemon-fighter"></div>
          <p class="vs-text">VS</p>
          <div id="pokemon2-display" class="pokemon-fighter"></div>
          <div class="battle-log-container">
            <h2>Registre de la Batalla</h2>
            <div id="battle-log"></div>
          </div>
        </div>
      </section>
      <section id="battle-section" v-if="currentScreen === 'battle'">
        <h2>Moment de la Batalla!</h2>
        <p id="current-turn-display">És el torn del Jugador 1!</p>
        <button id="perform-attack-button" @click="startBattle">Atacar!</button>
      </section>
    </div>
  `,
  data() {
    return {
      currentScreen: 'setup',
      isTwoPlayers: true,
      player1Name: '',
      player2Name: '',
      currentPlayerSelectionMessage: '',
      sortCriteria: 'name',
      sortMethod: 'bubble',
      buttonLabel: 'Següent Jugador',
      globalPokemonList: [],
      viewModel: new PokemonTeamViewModel()
    }
  },
  computed: {
    creditsDisplay() {
      return this.viewModel.getCredits();
    },
    currentPlayerTeam() {
      return this.viewModel.getCurrentTeam();
    }
  },
  methods: {
    startGame() {
      if (!this.player1Name || (this.isTwoPlayers && !this.player2Name)) {
        alert("Si us plau, introdueix els noms de tots els jugadors.");
        return;
      }
      if (!this.isTwoPlayers) {
        this.player2Name = "CPU";
      }
      this.currentScreen = 'teamSelection';
      this.viewModel.initializeMatch(this.player1Name, this.player2Name);
      this.currentPlayerSelectionMessage = `${this.player1Name}, selecciona el teu equip Pokémon`;
      this.renderGlobalList();
    },
    renderGlobalList() {
      this.globalPokemonList = this.viewModel.getGlobalList();
    },
    handleNextPlayer() {
      if (this.viewModel.currentPlayer === this.viewModel.player1) {
        this.viewModel.switchPlayer();
        if (this.isTwoPlayers) {
          this.currentPlayerSelectionMessage = `${this.player2Name}, selecciona el teu Pokémon`;
          this.buttonLabel = 'Fi de la selecció d\'equips';
        } else {
          this.currentPlayerSelectionMessage = `${this.player2Name} ha seleccionat el seu equip.`;
          this.viewModel.autoSelectCpuTeam();
          this.buttonLabel = 'Fi de la selecció d\'equips';
        }
      } else {
        this.currentScreen = 'battle';
      }
    },
    handleSortOptions() {
      this.viewModel.sortGlobalList(this.sortCriteria, this.sortMethod);
      this.renderGlobalList();
    },
    isPokemonInTeam(name) {
      const team = this.viewModel.currentPlayer === this.viewModel.player1 ? this.viewModel.player1.team : this.viewModel.player2.team;
      return team.selectedTeam.some(p => p.name === name);
    },
    handleToggleSelection(pokemon) {
      const team = this.viewModel.currentPlayer === this.viewModel.player1 ? this.viewModel.player1.team : this.viewModel.player2.team;
      const exists = team.selectedTeam.find(p => p.name === pokemon.name);
      if (exists) {
        this.viewModel.removePokemonFromTeam(pokemon.name);
      } else {
        const added = this.viewModel.addPokemonToCurrentPlayer(pokemon);
        if (!added) {
          alert("No es pot afegir el Pokémon.");
        }
      }
    },
    startBattle() {
      this.viewModel.startBattle();
    }
  },
  mounted() {
    fetch('./pokemon_data.json')
      .then(response => response.json())
      .then(data => {
        this.viewModel.pokemonList.loadPokemons(data);
        this.renderGlobalList();
      })
      .catch(error => console.error("Error loading Pokémon data:", error));
  }
};

createApp(App).mount('#app');
