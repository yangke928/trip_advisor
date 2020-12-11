import {USER_URL} from "./config"

const findOneUser = (username) =>
    fetch(USER_URL).then(response => response.json())
        .then(usersList => usersList.filter(user => user.username === username))

const findUserByUsername = (username) =>
    fetch(`${USER_URL}/${username}`).then(response => response.json())

const createUser = (user) =>
    fetch(USER_URL, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())

const updateUser = (userId, newUser) =>
    fetch(`${USER_URL}/${userId}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())


export default {
    findOneUser, createUser, findUserByUsername, updateUser
};
