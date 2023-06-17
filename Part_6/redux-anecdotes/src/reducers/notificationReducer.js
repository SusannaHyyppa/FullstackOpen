import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
}

const notificationSlice = createSlice({
    name: 'notification', 
    initialState, 
    reducers: {
        removeNotification(state) {
            state.value = null

        }, 
        addNotification(state, action) {
            state.value = action.payload
        }
    }
    
        
    
})

export const {removeNotification, addNotification} = notificationSlice.actions
export default notificationSlice.reducer
