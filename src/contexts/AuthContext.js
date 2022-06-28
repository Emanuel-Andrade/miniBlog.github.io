import { useContext, createContext } from "react";

const authContext = createContext()

export function AuthContextProvider ({children, value}){
   return  (
    <authContext.Provider value={value}>
    {children}
   </authContext.Provider>
   )
}

export function useAuthContext(){
    return useContext(authContext)
}