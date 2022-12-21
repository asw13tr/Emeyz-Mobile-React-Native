import {configureStore, combineReducers} from "@reduxjs/toolkit"
import PostReducer from "./Reducers/Post"
import PageReducer from "./Reducers/Page"
import MenuReducer from "./Reducers/Menu"

const reducers = combineReducers({
    "Post": PostReducer,
    "Page": PageReducer,
    "Menu": MenuReducer,
});

const store = configureStore({
    reducer: reducers
});

export default store
