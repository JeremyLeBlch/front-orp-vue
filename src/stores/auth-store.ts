import {ref} from "vue";
import jwt_decode from "jwt-decode";
import {defineStore} from "pinia";
import {authDao} from "@/dao/auth-dao";
import User from '@/models/user';

export const useAuthStore = defineStore("auth", () => {
  const localStorageTokenKey = "app_token";

  const user = ref<User>(null);
  const jwtToken = ref<string>("");

  const getToken = () => jwtToken.value;

  const parseTokenToUser = (token: string) => {
    try {
      jwtToken.value = token ?? "";
      const userInfo: { user: User } = jwt_decode(token);
      user.value = new User(userInfo.user);
    } catch (err) {
      // skip
    }
  };

  const login = async (email: string, password: string): Promise<any> => {
    const token = await authDao.login(email, password);
    parseTokenToUser(token);
    localStorage.setItem(localStorageTokenKey, token);
  };

  const logout = () => {
    user.value = null;
    jwtToken.value = "";
    localStorage.removeItem(localStorageTokenKey);
  };


  const currentToken = localStorage.getItem(localStorageTokenKey);
  if (currentToken) {
    parseTokenToUser(currentToken);
  }

  return {
    login,
    logout,
    getToken,
    user
  };
});
