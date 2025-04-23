// Description: This file contains the functions that make the API calls to the PokeAPI.

// Function that makes a GET request to the PokeAPI to get the data of a specific pokemon
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
async function GetTypeRelations(type, callback){
    try{

    }
    catch(error){
        console.log(error);
    }
}

export async function GetPokemonData(name, callback){
    try{
        //check if the data is already cached and is not expired
        let data = getCachedData(name);
        //if it is, return the data
        if (data != null){
            callback(data);
            return;
        }
        //if it isn't, call the API to get the data
        data = await callApiPromise('https://pokeapi.co/api/v2/pokemon/' + name);

        //remove unnecessary data from the response
        delete data.forms;
        delete data.game_indices;
        delete data.past_types;
        delete data.past_abilities;
        delete data.abilities;
        delete data.held_items;
        delete data.cries;
        delete data.moves;
        delete data.base_experience;
        delete data.location_area_encounters;
        delete data.sprites.other;
        delete data.sprites.versions;   
        delete data.sprites.back_default;
        delete data.sprites.back_shiny;
        delete data.sprites.front_shiny;

        //cache the data
        cacheData(name, data);
        
        //console.log(data);
        //call the callback function with the data as an argument
        callback(data);
    }
    catch(error){
        console.log(error);
    }
}

//caches the data in local storage with the name of the pokemon as the key and the data and expiry as the value
function cacheData(name, data){
    //get the current time
    let time = new Date().getTime();
    //create a cache object with the data and the expiry time
    let cache = {
        data: data,
        expires: time + 1000 * 60 * 60 * 24 //cache for 24 hours
    };
    //set the cache object in local storage with the name of the pokemon as the key
    localStorage.setItem(name, JSON.stringify(cache));
}

// gets the data from local storage and checks if it is expired or not
function getCachedData(name){
    //check if the data is already cached and is not expired
    if (localStorage.getItem(name) != null && JSON.parse(localStorage.getItem(name)).expires > new Date().getTime()){
        //if it is, return the data
        return JSON.parse(localStorage.getItem(name)).data;
    }
    else{
        //if it isn't, return null
        return null;
    }
}