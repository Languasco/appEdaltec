
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    spinner : false,
}
const spinnerSlice = createSlice({ 
    name : 'spinner',
    initialState,
    reducers : {
        spinnerOpen(state, action){
            return {
                ...state,
                spinner : true
            }
        },
        spinnerClose(state, action){
            return {
                ...state,
                spinner : false
            }  
        },
    }
})

export const { spinnerOpen, spinnerClose } = spinnerSlice.actions;

export default spinnerSlice.reducer;