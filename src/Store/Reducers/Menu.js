import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: []
}

const Menu = createSlice({
    name: "post",
    initialState,
    reducers: {
        setMenu(state, action){
            state.items = action.payload
        },
    }
})


export const {setMenu} = Menu.actions;
export default Menu.reducer;
