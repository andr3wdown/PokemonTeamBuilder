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
                `).join("")}
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
        }
        h4{
            margin-bottom: 10px;
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
        `;
    }
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        let val = {
            name: "test",
            pokemons: []
        }
        if (val.pokemons.length < 6){
            for(let i = val.pokemons.length; i < 6; i++){
                val.pokemons.push({name: "-", sprite: "../../img/question.svg"});
            }
        }

        this.shadowRoot.innerHTML = this.template(val);
    }

    static get observedAttributes(){
        return ["team"]
    };
    attrubuteChangedCallback(attrName, oldValue, newValue){
        if(attrName === "team"){
            if(newValue === null || newValue === undefined || newValue === ""){
                this.shadowRoot.innerHTML = this.template(null);
                return;
            }
            let val = JSON.parse(newValue);
            if (val.pokemons.lenght < 6){
                for(let i = val.pokemons.length; i < 6; i++){
                    val.pokemons.push({name: "-", sprite: "../../img/question.svg"});
                }
            }
            this.shadrowRoot.innerHTML = this.template(val);
        }
    }
}