import { colors } from "../type-colors.js"

//define the pokemon card component
export class PokeCard extends HTMLElement{
    //html template for the pokemon card component
    //render the data in the card
    //if the data is null, render the card with no data
    template(data) {
        return /*html*/ `
        <style>${this.style}</style>
        <div class="pokemon-card">
            <div class="main-container">
                <div class="card-header">
                    <h2>${data == null ?  "-" : data.name}</h2>
                    <h2>${data == null ?  "-" : "#"+ data.id}</h2>
                </div>

                <div class="image-container">
                    <img class="pokemon-icon" src="${data == null ? "../../img/question.svg" : data.sprites.front_default}" alt="pokemon-icon">
                </div>

                <div class="types-constainer">
                    ${data == null ?  "-" : data.types.map((type) => /*html*/`<h3 style="${this.type_style(type)}">${type.type.name}</h3>`).join("")}
                </div>
            </div>
            
            <div class="stats-container">
                <h3>Base stats</h3>
                ${data == null ?  "-" : data.stats.map((stat) => /*html*/`
                    <div class="stat">
                        <h3 style="z-index:1; padding-left: 10px;">${stat.stat.name}</h3>
                        <h3 style="z-index:1;">${stat.base_stat}</h3>
                        <div style="width: ${(stat.base_stat / 255) * 320}px; background-color: green; position: absolute; height: 40px; z-index: 0;"></div>
                    </div>
                `).join("")}
                <h3>StatTotal: ${data == null ?  "-" : data.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</h3>
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
    //css style for the pokemon card component
    get style(){
        return /*css*/`
        .pokemon-card{
            caret-color: transparent;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border: 1px solid black;
            border-radius: 10px;
            margin: 5px;
            padding: 5px;
            width: 600px;
            min-height: 400px;
            background-color: var(--card-color);
        }
        .pokemon-icon{
            image-rendering: pixelated;
            width: 200px;
            height: 200px;
            user-select: none;
        }

        h2::first-letter, h3::first-letter{
            text-transform: capitalize;

        }
        .card-header{
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .card-header h2{
            margin: 20px;
        }
        .image-container{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 200px;
            background-color: var(--icon-color);
            border-radius: 5%;
            margin : 20px;
        }
        .types-constainer{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
        }
        .stats-container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 300px;
            margin-inline: 20px;
            margin-bottom: 20px;
        }

        .stat{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 40px;
        }
        `;
    }
    //observed attributes for the pokemon card component
    static get observedAttributes() {
        return ['data-json'];
    }
    //constructor for the pokemon card component
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    //runs when an observed attribute changes
    attributeChangedCallback(name, oldValue, newValue){
        //check if the attribute that changed is data-json
        //if it is, parse the new value to a JSON object and render the card with the new data
        if (name === 'data-json'){
            //if the new value is an empty string, render the card with no data and return
            if(newValue == "") {
                this.shadowRoot.innerHTML = this.template(null);
                return;
            }
            //parse the new value to a JSON object
            let data = JSON.parse(newValue);
            //render the card with the new data
            this.shadowRoot.innerHTML = this.template(data);
            
        }
    }
}