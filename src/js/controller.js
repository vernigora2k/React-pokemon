import { apiRequest } from "./apiClient";

export function getPokemon(url) {
    return apiRequest('GET', url)
        .then()
        .catch(error => console.log(error))
}