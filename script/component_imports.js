import { App } from './components/app.js';
import { PokeCard } from './components/pokemon_card.js';
import { TeamCard } from './components/team_card.js';

//define the custom elements
const main = () => {
    customElements.define('poke-app', App);
    customElements.define('poke-card', PokeCard);
    customElements.define('team-card', TeamCard)
}

main();