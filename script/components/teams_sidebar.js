
export class TeamsSidebar extends HTMLElement{
    //html template for the teams sidebar component
    get template() {
        return /*html*/ `
        <style>${this.style}</style>
        
        <aside class="teams-sidebar" id="teams-sidebar">
            <button id="sidebar-button" class="sidebar-button">
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
                    <!-- Teams will be rendered here -->
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
    //add a single team to the sidebar
    addTeam(team){
        const teamsContainer = this.shadowRoot.getElementById("teams-container");
        const teamCard = document.createElement("team-card");
        teamCard.setAttribute("data-json", JSON.stringify(team));
        teamsContainer.appendChild(teamCard);
        // Save the teams to local storage
        this.teams.push(team);
        localStorage.setItem("teams", JSON.stringify(this.teams));
    }
    //render the teams to the sidebar
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
        //render the template to the shadow root
        this.shadowRoot.innerHTML = this.template;
        //get the teams from local storage if they exist
        this.teams = JSON.parse(localStorage.getItem("teams")) || [];
        //render the teams to the sidebar
        this.renderTeams(this.teams);

        //add event listeners to the create team button
        this.shadowRoot.getElementById("create-team").addEventListener("click", () => {
            //get the value of the team name input field
            //check if the team name is empty
            const teamName = this.shadowRoot.getElementById("team-name").value;
            if (teamName == ""){
                alert("Please enter a team name");
                return;
            }
            //check if the team name already exists¨
            const teamExists = this.teams.some(team => team.name === teamName);
            if (teamExists){
                alert("Team name already exists");
                return;
            }
            //create a new custom event for creating a new team
            const event = new CustomEvent("create-team", {
                detail: { name: teamName },
                bubbles: true,
                composed: true
            });
            //reset the team name input field
            this.shadowRoot.getElementById("team-name").value = "";
            //dispatch the event to the parent element (app in this case)
            this.dispatchEvent(event);
        });
    }

}