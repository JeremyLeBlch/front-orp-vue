import {defineStore} from "pinia";
import {ref} from "vue";
import {userDao} from "@/dao/user-dao";
import type User from "@/models/user";


export const useUserStore = defineStore("user", () => {
    const users = ref<User[]>([]);
    const user = ref<User>(null);
    const userRoles = ref<string[]>([]);
    const technicians = ref<User[]>([]);
    const clients = ref<User[]>([]);

    const getUsers = async (user: User) => {
        users.value = await userDao.getUsers(user);
        userRoles.value = users.value.map(u => u.user_role);
    };

    const getUserById = async (id: number) => {
        user.value = null;
        user.value = await userDao.getUserById(id);
    };

    const getAllTechnicians = async () => {
        technicians.value = await userDao.getAllTechnicians();
    };

    const getAllClients = async () => {
        clients.value = null;
        clients.value = await userDao.getAllClients();
    };

    const createUser = async (formUser : Partial<User>) => {
        user.value = await userDao.createUser(formUser);
    };

    const saveUser = async (id: number, formUser : Partial<User>) => {
        user.value = await userDao.updateUser(id, formUser);
    };

    const deleteUser = async (id: number) => {
        user.value = null;
        user.value = await userDao.deleteUser(id);
    };

    return {
        getUsers,
        users,
        userRoles,
        getUserById,
        user,
        getAllTechnicians,
        getAllClients,
        technicians,
        clients,
        saveUser,
        createUser,
        deleteUser
    };
});