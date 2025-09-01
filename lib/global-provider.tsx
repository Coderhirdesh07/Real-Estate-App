import { createContext, useContext ,ReactNode } from "react";
import { useAppwrite } from "./use.Appwrite";
import {getUser} from "./appwrite";

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
    refetch:()=>void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
interface GlobalProviderProps{
    children:ReactNode;
}

export const GlobalProvider = ({children}:GlobalProviderProps) =>{
    const {data:User,loading,refetch}  = useAppwrite({fn:getUser});
    const isLoggedin = !!User;

    return (
        <GlobalContext.Provider value={{isLoggedin,User,loading,refetch}}>
                {children}
        </GlobalContext.Provider>
    )

}
export const useGlobalContext = ():GlobalContextType =>{
    const context = useContext(GlobalContext);
    if(!context) throw new Error('useGlobalContext must be added with global Provider');
    return context;
}

export default GlobalProvider;