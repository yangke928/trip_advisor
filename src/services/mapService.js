import {MAP_URL} from "./config"

export const convertPosition = (zipcode) =>
    fetch(`${MAP_URL}/${zipcode}`)
        .then(response => response.json())




