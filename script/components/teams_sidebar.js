
export class TeamsSidebar extends HTMLElement{
    //html template for the teams sidebar component
    template(data) {
        return /*html*/ `
        <style>${this.style}</style>

        `;
    }
    get style(){
        return /*css*/`
        *{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        `;
}