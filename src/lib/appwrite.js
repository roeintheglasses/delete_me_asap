import { Client, Account } from "appwrite";

/**
 * Service class for Appwrite client configuration and management
 * @class AppwriteService
 */
class AppwriteService {
  /** @type {AppwriteService|null} */
  static instance = null;

  /** @type {Client|null} */
  client = null;

  /** @type {Account|null} */
  account = null;

  /**
   * Creates an instance of AppwriteService or returns existing instance
   * @constructor
   * @returns {AppwriteService}
   */
  constructor() {
    if (AppwriteService.instance) {
      return AppwriteService.instance;
    }

    this.client = new Client();
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    this.account = new Account(this.client);
    AppwriteService.instance = this;
  }

  /**
   * Gets singleton instance of AppwriteService
   * @static
   * @returns {AppwriteService}
   */
  static getInstance() {
    if (!AppwriteService.instance) {
      AppwriteService.instance = new AppwriteService();
    }
    return AppwriteService.instance;
  }
}

/** @type {AppwriteService} */
const appwriteService = AppwriteService.getInstance();
/** @type {Client} */
export const client = appwriteService.client;
/** @type {Account} */
export const account = appwriteService.account;
export { ID } from "appwrite";
