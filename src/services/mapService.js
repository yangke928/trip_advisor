const MAP_URL = "http://api.zippopotam.us/us"

const convertPosition = (zipcode) =>
    fetch(`${MAP_URL}/${zipcode}`)
        .then(response => response.json())



export default {convertPosition}
