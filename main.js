// "#" comme en CSS pour un ID.
// Si "formulaire" était une class alors on aurait mis un "."
var formELT = document.querySelector("#formulaire");
// Récupérer la valeur de l'input pour récupérer le nom de la ville
var inputELT = document.querySelector("#input")
// Récupérer l'ID du titre du nom de la ville
var titleELT = document.querySelector("#title")
var listELT = document.querySelector("#list")


// Fonction pour ajouter un élément à la liste
function addElementInList(text){
    var newLiELT = document.createElement("li")
newLiELT.textContent = text
// On crée un "enfant" à ajouter dans la liste qui sera donc le Li
listELT.appendChild(newLiELT)
}

// Faire appel à une API avec Fetch
// C'est une librairie permettant d'envoyer des requêtes HTTP de manière asynchrone, 
// un peu comme les requêtes HMLHttpRequest. Contrairement à cette dernière API, Fetch 
// fonctionne de manière simple. Les fonctions sont extrêmement simple et tout les 
// navigateurs web la supportent.
function getWeatherDataByCity(city){
var apiURL = "https://www.prevision-meteo.ch/services/json/"
return fetch (apiURL + city, {methode : "GET"})
.then((data)=>{
    return data.json()
    data.json()
})
.then((json) =>{
    return json

})
}

// Les "()"permettent de mettre des PAREMETRES dans la fonction
async function displayWeather(event){
// Pour arrêter le rafraîchissement automatique de la page lorsqu'on clique sur le bouton de recherche
    event.preventDefault()

    // Pour récupérer le nom de la ville rechercher
    var cityName = inputELT.value
    
    // Récupérer les informations météo de la ville grâce à Fetch
   var weatherData = await getWeatherDataByCity(cityName)
   console.log(weatherData)



    // Afficher les infos
    var condition = weatherData.current_condition.condition
    var humidity = weatherData.current_condition.humidity
    var tmp = weatherData.current_condition.tmp

    // Changer le titre de la ville
    titleELT.textContent = "La météo du jour à " + cityName

    // Clear l'élément condition de la liste (empêcher la création infinie de condition lorsqu'on effectue une recherche)
    listELT.innerHTML = ""

    // Ajouter un élément dans la liste
    addElementInList("Condition : " + condition)
    addElementInList("Humidité : " + humidity + "%")
    addElementInList("Température : " + tmp + "°")

}



// Ecouteur d'évènement
// DisplayWeather est la fonction qu'on a instancié plus tôt ( un peu comme sur Android Studio)
formELT.addEventListener("submit", displayWeather)