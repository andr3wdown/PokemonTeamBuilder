import { App } from './components/app.js';
import { PokeCard } from './components/pokemon_card.js';
import { TeamCard } from './components/team_card.js';
import { TeamsSidebar } from './components/teams_sidebar.js';
import { TeamDisplay } from './components/team_display.js';

//define the custom elements
const importElements = () => {
    customElements.define('poke-app', App);
    customElements.define('poke-card', PokeCard);
    customElements.define('team-card', TeamCard);
    customElements.define('teams-sidebar', TeamsSidebar);
    customElements.define('team-display', TeamDisplay);
}

importElements();