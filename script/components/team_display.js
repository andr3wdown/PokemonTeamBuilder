export class TeamDisplay extends HTMLElement{
    //template for the team display component
    //used to display the team name and the pokemons in the team
    template(team){
        return /*html*/ `
        <style>${this.style}</style>
        <div class="team-display">
            <h4>${team.name}</h4>
            <div class="team-container">
                ${  
                    team == null ?  "-" :
                    team.pokemons.map((pokemon) => /*html*/`
                    <div class="frame">
                        <img class="pokemon-icon" src="${pokemon.sprite}" alt="pokemon-icon">
                    </div>
                    `).join("")
                }
                <button id="delete-team" class="frame"><img class="pokemon-icon" src="../../img/delete.svg"></button>
            </div>
        </div>
        `;
    }
    get style(){
        return /*css*/ `
        *{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            z-index: 9;
        }
        h4{
            margin-bottom: 10px;
        }
        button{
            border: none;
            background-color: transparent;
            cursor: pointer;
        }
        .team-display{
            text-align: center;
            background-color: var(--content-color);
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 10px;
        }
        .team-display:hover{
            background-color: var(--content-hover-color);
            transition: 0.3s;
            cursor: pointer;
        }
        .team-container{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;
        }
        .frame{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background-color: var(--icon-color);
            width: 60px;
            height: 60px;

        }
        .pokemon-icon{
            width: 50px;
            height: 50px;
            image-rendering: pixelated;
        }
        `;
    }
    //constructor for the team display component
    constructor(){
        super();
        //create a shadow root for the component
        this.attachShadow({mode: "open"});
        //bind the delete function to the class instance
        this.deleteClick = this.handleDelete.bind(this);
        //bind the show function to the class instance
        this.showClick = this.handleShow.bind(this);
        
    }
    //handles the delete button click event
    handleDelete(event){
        //stop the event from propagating to the parent element
        event.stopPropagation();
        //dispatch a custom event to the parent element with the team name as the detail
        this.dispatchEvent(new CustomEvent("delete-team", {
            detail: {
                name: this.shadowRoot.querySelector("h4").innerText
            },
            bubbles: true,
            composed: true
        }));
    }
    //handles the show button click event
    handleShow(event){
        //stop the event from propagating to the parent element
        event.stopPropagation();
        //dispatch a custom event to the parent element with the team name as the detail
        this.dispatchEvent(new CustomEvent("show-team", {
            detail: {
                name: this.shadowRoot.querySelector("h4").innerText
            },
            bubbles: true,
            composed: true
        }));
    }
    //observed attributes for the team display component
    static get observedAttributes(){
        return ["team"]
    };
    //called when the observed attributes change
    //used to update the teams
    attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName === "team"){
            this.removeEventListeners();
            //check if the new value is null or undefined or empty string
            //if it is, render the template with null
            if(newValue === null || newValue === undefined || newValue === ""){
                this.shadowRoot.innerHTML = this.template(null);
                return;
            }
            //parse the new value and check if it is valid
            //if it isn't, render the template with null
            let val = JSON.parse(newValue);
            if (val.pokemons.length < 6){
                for(let i = val.pokemons.length; i < 6; i++){
                    val.pokemons.push({name: "-", sprite: "../../img/question.svg"});
                }
            }
            //render the template with the new value
            this.shadowRoot.innerHTML = this.template(val);
            this.addEventListeners();
        }
    }
    //called when the element is removed from the DOM
    disconnectedCallback(){
        this.removeEventListeners();

    }
    //helper function for removing event listeners
    removeEventListeners(){
        const deleteButton = this.shadowRoot.getElementById("delete-team");
        if (deleteButton) {
            deleteButton.removeEventListener("click", this.deleteClick);
        }
        const teamDisplay = this.shadowRoot.querySelector(".team-display");
        if (teamDisplay) {
            teamDisplay.removeEventListener("click", this.showClick);
        }
    }
    //helper function for adding event listeners
    addEventListeners(){
        const deleteButton = this.shadowRoot.getElementById("delete-team");
        if (deleteButton) {
            deleteButton.addEventListener("click", this.deleteClick);
        }
        const teamDisplay = this.shadowRoot.querySelector(".team-display");
        if (teamDisplay) {
            teamDisplay.addEventListener("click", this.showClick);
        }
    }
}