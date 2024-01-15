
import {configureStore} from "@reduxjs/toolkit";
import createAuthSlice from "./features/slice";


export default configureStore({
    reducer:{

        //register createAuthSlice with a key 
        auth: createAuthSlice,
    }
})