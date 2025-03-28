// Description: This file contains the functions that make the API calls to the PokeAPI.

// Function that makes a GET request to the PokeAPI to get the data of a specific pokemon and calls the callback function with the data as an argument.


function callApiPromise(url, data = null){
    return new Promise((resolve, reject) => {
        //create a new XMLHttpRequest object
        const xhttp = new XMLHttpRequest();
        //open a GET request to the PokeAPI with the url
        xhttp.open("GET", url, false);
        xhttp.onload = () => {
            if (xhttp.status == 200){
                data = JSON.parse(xhttp.responseText);
                resolve(data);
            }   
            else{
                //alert the user if the pokemon wasn't found
                alert("Error: " + "couldn't find the pokemon: " + name);
                reject(new Error("request failed with the code" + xhttp.status));
            }
        };
        //send the request
        xhttp.send();
    });
}
async function GetTypeRelations(types){
    
}

export async function GetPokemonData(name, callback){
    try{
        let data = await callApiPromise('https://pokeapi.co/api/v2/pokemon/' + name);

        //remove unnecessary data from the response
        delete data.forms;
        delete data.game_indices;
        delete data.past_types;
        delete data.past_abilities;
        delete data.held_items;
        delete data.cries;
        delete data.moves;
        /*
        let species_data = await callApiPromise(data.species.url);
        let evolution_data = await callApiPromise(species_data.evolution_chain.url);
        data.evolution_chain = evolution_data;
        */
        
        console.log(data);
        callback(data);
    }
    catch(error){
        console.log(error);
    }
}