const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    flag_executeAction : false,
}

const executeActionSlice = createSlice({ 
    name : 'EjecutarAcciones',
    initialState,
    reducers : {
        flagExecuteAction(state, action){
            return {
                ...state,
                flag_executeAction : action.payload
            }
        },
    }
})

export const { flagExecuteAction } = executeActionSlice.actions;

export default executeActionSlice.reducer;