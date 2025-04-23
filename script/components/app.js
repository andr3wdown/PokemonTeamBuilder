import { GetPokemonData } from '../api_calls.js';

//define the app component
export class App extends HTMLElement{
    //html template for the app component
    get template() {
        return /*html*/ `
        <style>${this.style}</style>
        <div class="search-container">
            <teams-sidebar></teams-sidebar>
            <form class="search-header" action="">
                <h1>Pokemon Search</h1>
                <div class="search">
                    <input type="search" name="" id="search-bar" placeholder="Search for a pokemon" value="">
                    <button id="search-button">Search</button>
                </div>
                
            </form>
           
            <poke-card id="search-card" data-json=""></poke-card>
            <button id="add-button">Add To Team</button>
            
        </div>
        <h3 style="margin-top: 10px; margin-bottom: 10px;">Current Team</h3>
        <div class="team-container" id="team-container">
            
        </div>
        `;
    }
    //css style for the app component
    get style(){
        return /*css*/`
        *{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
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
        h1, h2, h3{
            text-align: center;
            margin-bottom: 20px;
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
    addPokemonToTeam(){
        let teamContainer = this.shadowRoot.getElementById('team-container');
        if(teamContainer.children.length >= 6){
            alert("You can only have 6 pokemon in your team");
            return;
        }
        let data = this.shadowRoot.getElementById('search-card').getAttribute('data-json');
        if(data == ""){
            alert("Please search for a pokemon first");
            return;
        }
        //this.shadowRoot.getElementById('search-card').setAttribute('data-json', "");
        let teamCard = teamContainer.appendChild(document.createElement('team-card'));
        teamCard.setAttribute('data-json', data);
    }

    //constructor for the app component
    constructor(){
        //call the super constructor
        super();

        //create a shadow root
        //attach the template to the shadow root
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.template;

        //add event listeners to the search bar and the add button
        const form = this.shadowRoot.querySelector('.search-header');
        form.addEventListener('submit', (event) => this.getData(event));
        const searchButton = this.shadowRoot.getElementById('search-button');
        searchButton.addEventListener('click', (event) => this.getData(event));

        const addButton = this.shadowRoot.getElementById('add-button');
        addButton.addEventListener('click', () => this.addPokemonToTeam());
    }
}