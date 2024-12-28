import { account, ID, client, OAuthProvider } from "./appwrite";

import { toast } from "sonner";

const authProviders = {
  github: OAuthProvider.Github,
  discord: OAuthProvider.Discord,
  google: OAuthProvider.Google,
};

/**
 * Signs up a new user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} name - User's name
 * @param {function(Object)} userCallBack - Callback function that receives the user object
 * @returns {Promise<void>}
 */
async function signup(email, password, name) {
  try {
    await account.create(ID.unique(), email, password, name);
    const user = await loginUser(email, password);
    return user;
  } catch (error) {
    console.log(error);
    toast.error("Signup failed!");
    return null;
  }
}

/**
 * Logs in a user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {function(Object)} userCallBack - Callback function that receives the user object
 * @returns {Promise<void>}
 */
async function loginUser(email, password) {
  try {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    return user;
  } catch (error) {
    console.log(error);
    toast.error("Login failed!");
    return null;
  }
}

async function loginViaOAuth(provider) {
  const authProvider = authProviders[provider];
  if (!authProvider) {
    throw new Error("Invalid provider");
  }

  try {
    await account.createOAuth2Session(
      authProvider, // provider
      "http://localhost:5174/", // redirect here on success
      "http://localhost:5174/" // redirect here on failure
    );
  } catch (error) {
    console.log(error);
    toast.error(`Login via ${provider.toUpperCase()} failed!`);
    return null;
  }
}

/**
 * Creates an anonymous session for a user
 * @param {function(Object)} userCallBack - Callback function that receives the user object
 * @returns {Promise<void>}
 */
async function loginAnonymously() {
  try {
    await account.createAnonymousSession();
    const user = await account.get();
    return user;
  } catch (error) {
    console.log(error);
    toast.error("Anonymous login failed!");
    return null;
  }
}

/**
 * Logs out the current user by deleting their session
 * @returns {Promise<void>}
 */
async function logout() {
  await account.deleteSession("current");
}

/**
 * Gets the current user's information
 * @returns {Promise<Object>} The user object
 */
async function getUser() {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { signup, loginUser, loginAnonymously, loginViaOAuth, logout, getUser };
