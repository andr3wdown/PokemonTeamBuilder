import { GetPokemonData } from '../api_calls.js';

//define the app component
export class App extends HTMLElement{
    //html template for the app component
    get template() {
        return /*html*/ `
        <style>${this.style}</style>
        <div class="search-container">
            <teams-sidebar id="sidebar"></teams-sidebar>
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
        button{
            border: gray solid 1px;
            background-color: var(--icon-color);
            color: white;
            border-radius: 5px;
            cursor: pointer;
            padding-inline: 10px;
            padding-block: 2px;
            transition: 0.3s;
        }
        button:hover{
            background-color: var(--icon-hover-color);
            border-radius: 10px;
            transition: 0.3s;
        }
        `;
    }
    //gets the data from the api and sets the data-json attribute of the pokemon card component
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
    //add the pokemon to the team container
    addPokemonToTeam(){
        let teamContainer = this.shadowRoot.getElementById('team-container');
        //check if the team container has 6 children
        //if it does, alert the user and return
        if(teamContainer.children.length >= 6){
            alert("You can only have 6 pokemon in your team");
            return;
        }
        //get the data-json attribute of the pokemon card component
        //check if the data-json attribute is empty
        //if it is, alert the user and return
        let data = this.shadowRoot.getElementById('search-card').getAttribute('data-json');
        if(data == ""){
            alert("Please search for a pokemon first");
            return;
        }
        
        //create a new team card component and set the data-json attribute to the data
        let teamCard = teamContainer.appendChild(document.createElement('team-card'));
        teamCard.setAttribute('data-json', data);
    }
    createTeam(teamName){
        //get the team container
        const teamContainer = this.shadowRoot.getElementById('team-container');
        //get all the pokemon in the team container
        const pokemons = teamContainer.children;
        //check if the team name is empty
        if (pokemons.length == 0){
            alert("Please add at least one pokemon to the team");
            return;
        }
        //create a new team object
        let team = {
            name: teamName,
            pokemons: []
        }
        //loop through the pokemons and add them to the team object
        for(let i = 0; i < pokemons.length; i++){
            let pokemonData = JSON.parse(pokemons[i].getAttribute('data-json'));
            let pokemon = {
                name: pokemonData.name,
                sprite: pokemonData.sprites.front_default
            }
            team.pokemons.push(pokemon);
        }
        console.log(team);
        
        //change the new-team attribute of the teams sidebar
        this.shadowRoot.getElementById('sidebar').setAttribute('new-team', JSON.stringify(team));
        //clear the team container
        teamContainer.innerHTML = "";
    }

    showTeam(team){
        //get the team container
        const teamContainer = this.shadowRoot.getElementById('team-container');
        //clear the team container
        teamContainer.innerHTML = "";
        //loop through the pokemons and add them to the team container
        for(let i = 0; i < team.length; i++){
            if (team[i].name == "-"){
                continue;
            }
            GetPokemonData(team[i].name, (data) => {
                let teamCard = teamContainer.appendChild(document.createElement('team-card'));
                teamCard.setAttribute('data-json', JSON.stringify(data));
            });
        }
    }
    //constructor for the app component
    constructor(){
        //call the super constructor
        super();

        //create a shadow root
        //attach the template to the shadow root
        this.attachShadow({mode: 'open'});
        //render the template to the shadow root
        this.shadowRoot.innerHTML = this.template;

        //add event listeners to the search bar, search buton and the add button
        const form = this.shadowRoot.querySelector('.search-header');
        form.addEventListener('submit', (event) => this.getData(event));
        const searchButton = this.shadowRoot.getElementById('search-button');
        searchButton.addEventListener('click', (event) => this.getData(event));
        const addButton = this.shadowRoot.getElementById('add-button');
        addButton.addEventListener('click', () => this.addPokemonToTeam());

        this.addEventListener('create-team', (event) => {
            //stop the event from propagating to the parent element
            event.stopPropagation();
            //get the value of the team name from the event
            const teamName = event.detail.name;
            this.createTeam(teamName);
        });

        this.addEventListener('show-selected-team', (event) => {
            //stop the event from propagating to the parent element
            event.stopPropagation();
            //get the value of the team name from the event
            const team = event.detail.team;
            this.showTeam(team.pokemons);
        });
    }
}