import {API_KEY, DEFAULT_URL, RESTAURANT_URL} from "./config";

const findAllRestaurantByKeyword = (lat, lng, keyword) =>
    fetch(`${DEFAULT_URL}?term=restaurants+${keyword}&latitude=${lat}&longitude=${lng}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Origin: 'localhost',
            withCredentials: true,
            mode: 'no-cors'
        }
    }).then(response => response.json())

const findAllRestaurant = (lat, lng) =>
    fetch(`${DEFAULT_URL}?term=restaurants&latitude=${lat}&longitude=${lng}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Origin: 'localhost',
            withCredentials: true,
            mode: 'cors'
        }
    }).then(response => response.json())

const findRestaurantsBySort = (lat, lng, sort) =>
    fetch(`${DEFAULT_URL}?term=restaurants&latitude=${lat}&longitude=${lng}&sort_by=${sort}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Origin: 'localhost',
            withCredentials: true,
            mode: 'cors'
        }
    }).then(response => response.json())

const findRestaurantsByFilter = (lat, lng, filter) =>
    fetch(`${DEFAULT_URL}?term=restaurants+${filter}&latitude=${lat}&longitude=${lng}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Origin: 'localhost',
            withCredentials: true,
            mode: 'cors'
        }
    }).then(response => response.json())

const findRestaurantBySortAndFilter = (lat, lng, sort, filter) =>
    fetch(`${DEFAULT_URL}?term=restaurants+${filter}&latitude=${lat}&longitude=${lng}&sort_by=${sort}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Origin: 'localhost',
            withCredentials: true,
            mode: 'cors'
        }
    }).then(response => response.json())

const findRestaurantById = ( resId ) =>
    fetch(`${RESTAURANT_URL}/${resId}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Origin: 'localhost',
            withCredentials: true,
            mode: 'cors'
        }
    }).then(response => response.json())


const findReviewsById = (resId) =>
    fetch(`${RESTAURANT_URL}/${resId}/reviews`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Origin: 'localhost',
            withCredentials: true,
            mode: 'cors'
        }
    }).then(response => response.json())




export default {
    findAllRestaurant,
    findAllRestaurantByKeyword,
    findRestaurantsBySort,
    findRestaurantsByFilter,
    findRestaurantBySortAndFilter,
    findRestaurantById,
    findReviewsById
}
