import { GetPokemonData } from '../api_calls.js';

//define the app component
export class App extends HTMLElement{
    //html template for the app component
    get template() {
        return /*html*/ `
        <style>${this.style}</style>
        <div class="search-container">
            <form class="search-header" action="">
                <h1>Pokemon Search</h1>
                <input type="search" name="" id="search-bar" placeholder="Search for a pokemon" value="">
            </form>
           
            <poke-card id="search-card" data-json=""></poke-card>
            <button>AddToTeam</button>
        </div>
        <div class="team-container">

        </div>
        `;
    }
    //css style for the app component
    get style(){
        return /*css*/`
        .search-container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
        }
        .search-header{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
        }
        .team-container{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        `;
    }
    getData(event){
        event.preventDefault();
        
        //get the value of the search bar
        let pokemon = this.shadowRoot.getElementById('search-bar').value.toLowerCase();
        //check if the search bar is empty
        if (pokemon == ""){
            //if it is, alert the user and return
            alert("Please enter a pokemon name");
            return;
        }

        GetPokemonData(pokemon, (data) => {
            this.shadowRoot.getElementById('search-card').setAttribute('data-json', JSON.stringify(data));
        });
    }

    //constructor for the app component
    constructor(){
        //call the super constructor
        super();
        //create a shadow root
        //attach the template to the shadow root
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.template;

        const form = this.shadowRoot.querySelector('.search-header');
        form.addEventListener('submit', (event) => this.getData(event));
    }
}