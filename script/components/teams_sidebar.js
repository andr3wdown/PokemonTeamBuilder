
export class TeamsSidebar extends HTMLElement{
    //html template for the teams sidebar component
    template(data) {
        return /*html*/ `
        <style>${this.style}</style>
        
        <aside class="teams-sidebar" id="teams-sidebar">
            <button class="sidebar-button">
                <img src="../../img/side.svg" alt="teams">
            </button>
            <div class="sidebar-body">
                <div class="sidebar-adder">
                    <h3>Create a new team</h3>
                    <input type="text" id="team-name" placeholder="Enter team name" value="">
                    <button id="create-team">Create Team</button>
                </div>
                <h3>Teams</h2>
                <div class="teams-container" id="teams-container">
                    <team-display></team-display>
                </div>
            </div>
            
        </aside>
        `;
    }
    //css style for the teams sidebar component
    get style(){
        return /*css*/`
        *{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        h3{
            margin-bottom: 10px;
        }
        .teams-sidebar{
            position: fixed;
            width: 500px;
            height: 100vh;
            top: 0;
            right: -500px;
            background-color: var(--card-color);
            transition: 0.3s;
        }
        .teams-sidebar:hover{
            right: 0;
            transition: 0.3s;
        }
        .sidebar-button{
            position: fixed;
            height: 200px;
            top: calc(50% - 100px);
            right: 10px;
            background-color: var(--card-color);
            border: none;
            border-radius: 20px;
            padding: 5px;
            cursor: pointer;
            z-index: 10;
            transition: 0.5s;
        }
        .teams-sidebar:hover .sidebar-button{
            right: -300px;
            transition: 0.5s;
        }
        .sidebar-body{
            margin-top: 70px;
            margin-inline: 20px;
            margin-bottom: 50px;
        }
        .sidebar-adder{
            
            margin-bottom: 20px;
        } 
        `;
    }
    addTeam(){

    }
    renderTeams(teams){
        const teamsContainer = this.shadowRoot.getElementById("teams-container");
        teamsContainer.innerHTML = ""; // Clear the container before rendering

        teams.forEach((team) => {
            const teamCard = document.createElement("team-card");
            teamCard.setAttribute("data-json", JSON.stringify(team));
            teamsContainer.appendChild(teamCard);
        });
        
    }

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML = this.template();

        this.shadowRoot.getElementById("teams-sidebar");
    }

}