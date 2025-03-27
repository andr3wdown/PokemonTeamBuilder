export class PokeCard extends HTMLElement{
    get template() {
        return /*html*/ `
        <style>${this.style()}</style>
        `;
    }
    get style(){
        return /*css*/`

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
}