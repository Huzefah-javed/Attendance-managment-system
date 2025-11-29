import { configureStore, createSlice } from "@reduxjs/toolkit"



const authData = createSlice({
    name: "authInformation",
    initialState:{
        name: "",
        role: "",
        subject: ""
    },
    reducers:{
        addAuthData: (state, action)=>{
            state.name = action.payload.name;
            state.role = action.payload.role;
            if (action.payload.subject) {
                state.subject = action.payload.subject
            }
        }
    }
})

export const  {addAuthData} = authData.actions

export const store = configureStore({
    reducer: {
        authInfo: authData.reducer
    }
})