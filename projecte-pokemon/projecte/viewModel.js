import { Player, PokemonList, PokemonTeam } from "./model.js";

export class PokemonTeamViewModel {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.currentPlayer = this.player1;
    this.team = new PokemonTeam();
    this.pokemonList = new PokemonList();
  }
  initializeMatch(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.currentPlayer = this.player1;
  }
  switchPlayer() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  areTeamsComplete() {
    return this.player1.team.selectedTeam.length === this.player1.team.maxTeamSize &&
           this.player2.team.selectedTeam.length === this.player2.team.maxTeamSize;
  }
  addPokemonToTeam(name) {
    const pokemon = this.pokemonList.getPokemonByName(name);
    if (!pokemon) {
      console.error("❌ Pokémon not found in the global list.");
      return;
    }
    if (this.team.getCredits() < pokemon.points) {
      console.error("❌ Not enough credits to add this Pokémon!");
      return;
    }
    const success = this.team.addPokemon(pokemon);
    if (!success) {
      console.warn(`⚠️ The Pokémon ${pokemon.name} is already on the team.`);
    }
  }
  addPokemonToCurrentPlayer(pokemon) {
    if (this.currentPlayer === this.player1) {
      return this.player1.team.addPokemon(pokemon);
    } else if (this.currentPlayer === this.player2) {
      return this.player2.team.addPokemon(pokemon);
    }
  }
  removePokemonFromTeam(pokemonName) {
    if (this.currentPlayer === this.player1) {
      this.player1.team.removePokemon(pokemonName);
    } else if (this.currentPlayer === this.player2) {
      this.player2.team.removePokemon(pokemonName);
    }
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
  getCurrentTeam() {
    if (this.currentPlayer === this.player1) {
      return this.player1.getTeam();
    } else if (this.currentPlayer === this.player2) {
      return this.player2.getTeam();
    }
  }
  getCredits() {
    return this.currentPlayer.team.getCredits();
  }
  autoSelectCpuTeam() {
    console.log("⚙️ Auto-selecting Pokémon for CPU...");
    const cpuTeam = this.player2.team;
    const availablePokemons = [...this.pokemonList.allPokemons];
    for (let i = availablePokemons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePokemons[i], availablePokemons[j]] = [availablePokemons[j], availablePokemons[i]];
    }
    for (let pokemon of availablePokemons) {
      if (cpuTeam.selectedTeam.length < cpuTeam.maxTeamSize &&
          cpuTeam.credits >= pokemon.points) {
        cpuTeam.addPokemon(pokemon);
      }
      if (cpuTeam.selectedTeam.length >= cpuTeam.maxTeamSize) break;
    }
    console.log(`✅ CPU team selected: ${cpuTeam.getTeamDetails()}`);
  }
  async startBattle() {
    console.log("🔥 Iniciant la batalla...");
    while (this.player1.team.selectedTeam.length > 0 && this.player2.team.selectedTeam.length > 0) {
      await this.fightRound();
    }
    const winner = this.player1.team.selectedTeam.length > 0 ? this.player1.getName() : this.player2.getName();
    this.addToBattleLog(`🏆 La batalla ha acabat! ${winner} és el guanyador!`, 'h2');
  }
  addToBattleLog(message, type = 'p', bold = false) {
    const battleLogElement = document.getElementById("battle-log");
    const messageElement = document.createElement(type);
    messageElement.textContent = message;
    if (bold) {
      messageElement.style.fontWeight = 'bold';
    }
    battleLogElement.appendChild(messageElement);
    battleLogElement.scrollTop = battleLogElement.scrollHeight;
    console.log(message);
  }
  fightRound() {
    return new Promise((resolve) => {
      const pokemon1 = this.getRandomFighter(this.player1.team);
      const pokemon2 = this.getRandomFighter(this.player2.team);
      if (!pokemon1 || !pokemon2) return resolve();
  
      // Ocultamos la sección de batalla mientras comienza la pelea
      document.getElementById("battle-section").style.display = "none";
      this.addToBattleLog(`⚔️ ${pokemon1.name} vs ${pokemon2.name}`);
  
      // Se usa directamente la propiedad image, que ahora contiene la ruta absoluta
      document.getElementById("pokemon1-display").innerHTML = `
        <div class="pokemon-card" data-name="${pokemon1.name}" data-points="${pokemon1.points}">
          <img src="${pokemon1.image}" alt="${pokemon1.name}" />
          <h3>${pokemon1.name}</h3>
          <p>💥 Poder Especial: ${pokemon1.special_power}</p>
        </div>
      `;
      document.getElementById("pokemon2-display").innerHTML = `
        <div class="pokemon-card" data-name="${pokemon2.name}" data-points="${pokemon2.points}">
          <img src="${pokemon2.image}" alt="${pokemon2.name}" />
          <h3>${pokemon2.name}</h3>
          <p>💥 Poder Especial: ${pokemon2.special_power}</p>
        </div>
      `;
  
      setTimeout(() => {
        if (pokemon1.special_power === pokemon2.special_power) {
          this.addToBattleLog(`💥 ${pokemon1.name} i ${pokemon2.name} es derroten mútuament!`, 'p', true);
          this.player2.team.removePokemon(pokemon2.name);
          this.player1.team.removePokemon(pokemon1.name);
        } else if (pokemon1.special_power > pokemon2.special_power) {
          this.addToBattleLog(`💥 ${pokemon1.name} derrota ${pokemon2.name}!`);
          let damageMade = this.player2.team.removePokemon(pokemon2.name);
          let message = this.player1.team.decreaseSpecialPower(pokemon1.name, damageMade);
          this.addToBattleLog(`${message}`, 'p', true);
        } else {
          this.addToBattleLog(`💥 ${pokemon2.name} derrota ${pokemon1.name}!`);
          let damageMade = this.player1.team.removePokemon(pokemon1.name);
          let message = this.player2.team.decreaseSpecialPower(pokemon2.name, damageMade);
          this.addToBattleLog(`${message}`, 'p', true);
        }
        resolve();
      }, 5000);
    });
  }
  
  getRandomFighter(team) {
    if (team.selectedTeam.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * team.selectedTeam.length);
    return team.selectedTeam[randomIndex];
  }
}
