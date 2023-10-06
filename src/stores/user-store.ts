import {defineStore} from "pinia";
import {ref} from "vue";
import type User from "@/models/user";
import {userDao} from "@/dao/user-dao";

export const useUserStore = defineStore("user", () => {
    const user = ref<User>(null);

    const getUserById = async (id: number) => {
        user.value = null;
        user.value = await userDao.getUserById(id);
    };

    return {
        getUserById,
        user
    }
});