// export function getAllPokemons() {
//     const urlencoded = new URLSearchParams()
//     urlencoded.append('searchingPokemon', searchingPokemon)

import { apiRequest } from "./apiClient";
import { urlPokemonsList } from "./config";

//     apiRequest('GET', urlencoded)
// }

export function getAllPokemons() {
    return apiRequest('GET', urlPokemonsList)
        // .then(data => {console.log(data)})
        .then()
        .catch(error => console.log(error))
}