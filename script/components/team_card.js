import { colors } from "../type-colors.js"

export class TeamCard extends HTMLElement{
    //html template for the team card component
    template(data){
        return /*html*/ `
        <style>${this.style()}</style>
        <div class="team-card">
            <div class="card-header">
                <h3>${data == null ?  "-" : data.name}</h2>
            </div>

            <div class="image-container">
                <img class="pokemon-icon" src="${data == null ? "../../img/question.svg" : data.sprites.front_default}" alt="pokemon-icon">
            </div>

            <div class="types-constainer">
                ${data == null ?  "-" : data.types.map((type) => /*html*/`<h3 style="${this.type_style(type)}">${type.type.name}</h3>`).join("")}
            </div>
        </div>
        `;
    }
    //css style for the type text in the card
    type_style(type){
        return `
            text-align: center;
            min-width: 75px;
            color: black; 
            background-color: ${colors[type.type.name]}; 
            padding-inline: 10px; 
            border-radius: 5px;
        `;  
    }
    //css style for the team card component
    style(){
        return /*css*/`
            .team-card{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-width: 220px;
                background-color: var(--card-color);
                margin-inline: 5px; 
                border-radius: 10px;
            }
            .team-card:hover{
                background-color: var(--card-hover-color);
                transition: 0.3s;
            }
            .pokemon-icon{
                image-rendering: pixelated;
                width: 100px;
                height: 100px;
                user-select: none;
            }

            h2::first-letter, h3::first-letter{
                text-transform: capitalize;
            }
            .card-header{
                display: flex;
                width: 100%;
                justify-content: center;
            }
            .card-header h2{
                
            }
            .image-container{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
                height: 100px;
                background-color: var(--icon-color);
                border-radius: 5%;
                
            }
            .types-constainer{
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                width: 100%;
            }
        `;
    }
    //define the observed attributes for the custom element
    static get observedAttributes() {
        return ['data-json'];
    }
    //constructor for the custom element
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    //connected and disconnected callbacks for the custom element
    //these callbacks are called when the element is added or removed from the DOM
    connectedCallback(){
        //add event listener for removing the element
        this.addEventListener('click', this.removeElement);
    }
    disconnectedCallback(){
        //remove event listener for removing the element
        this.removeEventListener('click', this.removeElement);
    }
    //remove the element from the DOM
    removeElement(){
        if(this.parentNode){
            this.parentNode.removeChild(this);
        }
    }
    //runs when an observed attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        //check if the attribute is data-json
        //if it is, parse the json data and update the template with the data
        if (name === 'data-json') {
            if(newValue == "") {
                this.shadowRoot.innerHTML = this.template(null);
                return;
            }
            const data = JSON.parse(newValue);
            this.shadowRoot.innerHTML = this.template(data);
        }
    }
}