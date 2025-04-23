import { colors } from "../type-colors.js"

export class TeamCard extends HTMLElement{
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

    static get observedAttributes() {
        return ['data-json'];
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.template();
    }

    attributeChangedCallback(name, oldValue, newValue) {
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