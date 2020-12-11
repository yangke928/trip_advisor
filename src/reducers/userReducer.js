const initialState = {
    user: {},
    isSignIn: "",
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {

        case "UPDATE_USER_PROFILE":
            //when user login/signup, render user
            return {
                ...state,
                user: action.user,
                isSignIn: action.user.username
            }
        case "UPDATE_USER":
            return {
                ...state,
                user: action.user,
                isSignIn: action.user.username
            }
        case "UPDATE_USER_LogOut":
            return {
                ...state,
                isSignIn: action.isSignIn
            }
        default:
            return state;
    }
}

export default userReducer
