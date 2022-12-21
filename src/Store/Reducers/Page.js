import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    page: {}
}

const Page = createSlice({
    name: "Page",
    initialState,
    reducers: {

        setPage(state, action){
            state.page = action.payload;
        }
    }

})



export const {setPage} = Page.actions;
export default Page.reducer;
