import { account, ID, client } from "./appwrite";

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
    console.log("Signup failed: " + error.message);
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
    console.log("Login failed: " + error.message);
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
    console.log("Anonymous login failed: " + error.message);
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
    console.log("User not found", error);
    return null;
  }
}

export { signup, loginUser, loginAnonymously, logout, getUser };
