// Description: This file contains the functions that make the API calls to the PokeAPI.

// Function that makes a GET request to the PokeAPI to get the data of a specific pokemon and calls the callback function with the data as an argument.
export function GetPokemonData(name, callback){
    let url = 'https://pokeapi.co/api/v2/pokemon/' + name;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.onload = () => {
        if (xhttp.status == 200){
            console.log(JSON.parse(xhttp.responseText));
            callback(JSON.parse(xhttp.responseText));
        }   
        else{
            alert("Error: " + "couldn't find the pokemon");
        }
    };
    xhttp.send();
}
