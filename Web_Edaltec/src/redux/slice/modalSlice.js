const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    showModal : false,
    titleModal : ''  
}

const modalSlice = createSlice({ 
    name : 'modal',
    initialState,
    reducers : {
        modalOpen(state, action){
            return {
                ...state,
                showModal : true
            }  
        },
        modalClose(state, action){
            return {
                ...state,
                showModal : false
            }
        },
        modalTitle(state, action){
            return {
                ...state,
                titleModal : action.payload
            }  
        }
    }
})

export const { modalOpen, modalClose , modalTitle} = modalSlice.actions;

export default modalSlice.reducer;