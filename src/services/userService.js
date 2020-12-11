const USER_URL = "https://web-project-server.herokuapp.com/api/users"


const findOneUser = (username) =>
    fetch(USER_URL).then(response => response.json())
        .then(usersList => usersList.filter(user => user.username === username))

const findUserByUsername = (username) =>
    fetch(`${USER_URL}/${username}`).then(response => response.json())

// const findUserByUserId = (userId) =>
//     fetch(`${USER_URL}/${userId}`).then(response => response.json())

const createUser = (username, password, email) =>
    fetch(USER_URL, {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            type: "USER"
        }),
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
