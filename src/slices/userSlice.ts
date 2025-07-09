import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    isLogged: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload
            state.isLogged = true
        },
        logout(state) {
            state.id = ''
            state.isLogged = false
        },
    },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
