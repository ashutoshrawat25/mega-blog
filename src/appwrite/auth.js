import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
      );
      if (userAccount) {
        //call method to login
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("AppWrite service :: create account :: error ", error);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("AppWrite service ::login :: error ", error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AppWrite service :: get current user :: error ", error);
    }
    return null;
  }
  async logout() {
    try {
      await account.deleteSessions();
    } catch (error) {
      console.log("AppWrite service :: logout :: error ", error);
    }
  }
}
const authService = new AuthService();

export default authService;
