import {Account, Avatars, Client, Databases, OAuthProvider, Query} from "react-native-appwrite";
import * as Linking from "expo-linking";
import openAuthSessionAsync from "expo-web-browser"
export const config = {
    platform :'',
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASEID,
    agents :process.env.EXPO_PUBLIC_APPWRITE_TABLE_NAME_AGENTS,
    reviews:process.env.EXPO_PUBLIC_APPWRITE_TABLE_NAME_REVIEWS,
    gallery:process.env.EXPO_PUBLIC_APPWRITE_TABLE_NAME_GALLARIES,
    property:process.env.EXPO_PUBLIC_APPWRITE_TABLE_NAME_PROPERTY,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    projectName:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
   endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
}

export const client = new Client();

        client.setEndpoint(config.endpoint!)
        .setPlatform(config.platform!)
        .setProject(config.projectId!);


export const avatar = new Avatars(client);
export const account =  new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {
      const redirectUri = Linking.createURL("/");
  
      const response = await account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri
      );
      if (!response) throw new Error("Create OAuth2 token failed");
  
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );
      if (browserResult.type !== "success")
        throw new Error("Create OAuth2 token failed");
  
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed");
  
      const session = await account.createSession(userId, secret);
      if (!session) throw new Error("Failed to create session");
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
}

export async function logout() {
    try {
      const result = await account.deleteSession("current");
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  export async function getUser() {
    try {
      const result = await account.get();
      if (result.$id) {
        const userAvatar = avatar.getInitials(result.name);
  
        return {
          ...result,
          avatar: userAvatar.toString(),
        };
      }
  
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function getLatestProperties() {
    try {
      const result = await databases.listDocuments(
        config.databaseId!,
        config.property!,
        [Query.orderAsc("$createdAt"), Query.limit(5)]
      );
  
      return result.documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  export async function getProperties({
    filter,
    query,
    limit,
  }: {
    filter: string;
    query: string;
    limit?: number;
  }) {
    try {
      const buildQuery = [Query.orderDesc("$createdAt")];
  
      if (filter && filter !== "All")
        buildQuery.push(Query.equal("type", filter));
  
      if (query)
        buildQuery.push(
          Query.or([
            Query.search("name", query),
            Query.search("address", query),
            Query.search("type", query),
          ])
        );
  
      if (limit) buildQuery.push(Query.limit(limit));
  
      const result = await databases.listDocuments(
        config.databaseId!,
        config.property!,
        buildQuery
      );
  
      return result.documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  
  export async function getPropertyById({ id }: { id: string }) {
    try {
      const result = await databases.getDocument(
        config.databaseId!,
        config.property!,
        id
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
