import { createContext, useContext } from "react";
import { useAppwrite } from "./use.Appwrite";
import {getUser} from "./appwrite.ts";

interface User{
    $id:string;
    name:string;
    email:string;
    avatar:string;
}

interface GlobalContextType{
    isLoggedin:boolean;
    user:User | null;
    loading:boolean;
    refetch:(newParams?:Record<string,string | number>) =>
        Promise<void>;

}
const GlobalContext = createContext<GlobalContextType | undefined>

export const GlobalProvider = ({children}:{children:ReactNode}) =>{
    const {
        data:user,
        loading,
        refetch
      }  = useAppwrite({fn,params,skip}:{
        fn:getUser,
      });
      const isLoggedin = !!user;

        
    
    return (
        <GlobalContext.Provider value={{isLoggedin,user,loading,refetch}}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = ():GlobalContextType =>{
    const context = useContext(GlobalContext);
}