import React from 'react';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.min.css"
import {combineReducers, createStore, applyMiddleware} from "redux";
import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";
import restaurantReducer from "./reducers/restaurantReducer";
import userReducer from "./reducers/userReducer"
import {reviewReducer} from "./reducers/reviewReducer";

const reducers = combineReducers({restaurantReducer, userReducer, reviewReducer

})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') );

