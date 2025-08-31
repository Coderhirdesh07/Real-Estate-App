import {Avatars, Client, OAuthProvider} from "react-native-appwrite";
import * as Linking from "expo-linking";
export const config = {
    platform:'',
    endpoint:'',
    project:''
}
export const client = new Client();

client.setEndpoint().setPlatform().setProject()


export const avatar = new Avatars(client);
export const account =  new Account(client);

export async function login() {
    try{
        const redirect = client.createURL(path:'/');
        const response = await account.createOAUTH2Token((OAuthProvider.Google,redirect));

        if(!response) throw new Error('failed to login');
        const browserResult = await openAuthSessionAsync(response.toString(),redirect);
    }
    catch(error){
        console.log(error);
        return false;
    }
}