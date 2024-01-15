import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import * as api from "../api";


//create an action 
//slice is a feature of your application
export const login = createAsyncThunk('auth/login', async({formValue, navigate, toast})=>{
    try {
        const response = await api.signIn(formValue);
        toast.success('Logged in.');
        navigate('/')
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
})

//define authslice 
const createAuthSlice = createSlice({

    name: "auth",
    initialState: {
        user: null,
        error:"",
        loading: true,
    },
    reducers:{
        pending: (state)=>{
            state.loading = true;
        },
        fulfilled: (state,action)=>{
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify(action.payload));
            state.user = action.payload;
        },

        rejected:(state, action)=>{
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});


export default createAuthSlice.reducer;