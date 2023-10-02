import {ref} from "vue";
import jwt_decode from "jwt-decode";
import {defineStore} from "pinia";
import {authDao} from "@/dao/auth-dao";
import User from '@/models/user';

export const useAuthStore = defineStore("auth", () => {
    const user = ref<User>(null);

    const parseTokenToUser = (token: string) => {
         try {
            const userInfo: {user: User} = jwt_decode(token);
            user.value = new User(userInfo.user);
         } catch(err){
            // skip
         }
    };

    const login = async (email: string, password: string): Promise<any> => {
        const token = await authDao.login(email, password);
        parseTokenToUser(currentToken);
        localStorage.setItem('app_token', token);
    };

    const logout = () => {
        user.value = null;
        localStorage.setItem('app_token', null);
    };

    // Appelé directement au chargement de la page (code d'initialisation)
    // try to find the token in the storage
    const currentToken = localStorage.getItem('app_token');
    if (currentToken){
        parseTokenToUser(currentToken);
    }

    return {
        login,
        logout,
        user
    };
});
