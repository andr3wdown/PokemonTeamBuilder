function GetPokemonData(name){
    url = 'https://pokeapi.co/api/v2/pokemon/' + name;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.onload = () => {
        if (xhttp.status == 200){
            console.log(JSON.parse(xhttp.responseText));
            return JSON.parse(xhttp.responseText);
        }
        else{
            alert("Error: " + "couldn't find the pokemon");
            return null;
        }
    };
    xhttp.send();
}

GetPokemonData("pikachu");