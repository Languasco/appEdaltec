
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    objetoEdicion : {},  
}
const objectoEdicionSlice = createSlice({ 
    name : 'objetoEdicion',
    initialState,
    reducers : {
        objectoEdicion(state, action){
            return {
                ...state,
                objetoEdicion : action.payload
            }
        },
    }
})

export const { objectoEdicion } = objectoEdicionSlice.actions;

export default objectoEdicionSlice.reducer;