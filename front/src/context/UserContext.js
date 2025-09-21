import React, { createContext,useReducer } from 'react';
import {reducer as UserReducer,initialState} from '../reducer/UserReducer';
export const UserContext = createContext(); 

export const UserProvider=({children})=>{
    const[state,dispatch]=useReducer(UserReducer, initialState);
    return(
       <UserContext.Provider  value={{state:state,dispatch:dispatch}}>
         {children}
       </UserContext.Provider>
    )
}