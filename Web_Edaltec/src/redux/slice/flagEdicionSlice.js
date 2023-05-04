
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    flag_modoEdicion : false,  
}

const flagEdicionSlice = createSlice({ 
    name : 'flagEdicion',
    initialState,
    reducers : {
        flagEdicion(state, action){
            return {
                ...state,
                flag_modoEdicion : action.payload
            }   
        },
    }
})

export const { flagEdicion } = flagEdicionSlice.actions;

export default flagEdicionSlice.reducer;