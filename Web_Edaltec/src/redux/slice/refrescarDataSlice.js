
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    flag_refrescarData : false,
}

const refrescarDataSlice = createSlice({ 
    name : 'refrescarDatos',
    initialState,
    reducers : {
        refrescarDatoPrincipal(state, action){
            return {
                ...state,
                flag_refrescarData : action.payload
            }
        },
    }
})

export const { refrescarDatoPrincipal } = refrescarDataSlice.actions;

export default refrescarDataSlice.reducer;