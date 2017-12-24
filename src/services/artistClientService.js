const urlApi = "https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=2dab24fabbbf3596d4bc34613d7a3b9d&format=json";
function getArtists() {
    //fetch para aceder al api
    //convertimos a json
    return fetch(urlApi)
        .then(resp => resp.json())
        //filtro datos de la api
        .then(data => data.topartists.artist)
        .then(data => data.map(dataArtist => {
            return {
                id:dataArtist.mbid,
                name: dataArtist.name,
                urlImage: dataArtist.image[2]['#text'],
                like: 100,
                comment: 20,
            }
        }));
}
//EXPORTAR OBJETOS O FUNCIONES
export { getArtists };