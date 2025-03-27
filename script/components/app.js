import { GetPokemonData } from '../api_calls.js';

export class App extends HTMLElement{
    get template() {
        return /*html*/ `
        <style>${this.style}</style>
        <div class="search-container">
            hello world
        </div>
        <div class="team-container">

        </div>
        `;
    }
    get style(){
        return /*css*/`
        .search-container{
            display: flex;
            justify-content: center;
            align-items: center;
            
        }
        .team-container{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        `;
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue){
        
    }
    render(){
        this.shadowRoot.innerHTML = this.template;
    }
}