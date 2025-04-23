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
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.deleteClick = this.handleDelete.bind(this);
        this.showClick = this.handleShow.bind(this);
        
    }
    handleDelete(event){
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent("delete-team", {
            detail: {
                name: this.shadowRoot.querySelector("h4").innerText
            },
            bubbles: true,
            composed: true
        }));
    }
    handleShow(event){
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent("show-team", {
            detail: {
                name: this.shadowRoot.querySelector("h4").innerText
            },
            bubbles: true,
            composed: true
        }));
    }
    static get observedAttributes(){
        return ["team"]
    };
    attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName === "team"){
            this.removeEventListeners();

            if(newValue === null || newValue === undefined || newValue === ""){
                this.shadowRoot.innerHTML = this.template(null);
                return;
            }
            let val = JSON.parse(newValue);
            if (val.pokemons.length < 6){
                for(let i = val.pokemons.length; i < 6; i++){
                    val.pokemons.push({name: "-", sprite: "../../img/question.svg"});
                }
            }
            this.shadowRoot.innerHTML = this.template(val);
            this.addEventListeners();
        }
    }
    disconnectedCallback(){
        this.removeEventListeners();

    }
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