import User from "@/models/user";
import {envUtils} from "@/config/env-utils";

export const userDao = {

    getUsers: async (user: User): Promise<any[]> => {
        if (!user.isAdmin()) {
            return [];
        }
        const response = await fetch(envUtils.apiUrl + `/api/user`, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        });

        const jsonData: User[] = await response.json();
        const tabUsers = [];
        for (const user of jsonData){
            tabUsers.push(new User(user))
        }
        return tabUsers;
    },
    getUserById: async (userId: number): Promise<User> => {
        const response = await fetch(`${envUtils.apiUrl}/api/user/${userId}`, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        });
        return new User(await response.json());
    },
    getAllTechnicians : async (): Promise<User[]> => {
        const response = await fetch(envUtils.apiUrl + `/api/user/technician`, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        });

        const jsonData: User[] = await response.json();
        return jsonData.map(userJson => new User(userJson));
    },

    createUser: async (user: User): Promise<User> => {
        if (!user.isAdmin()) {
            throw new Error('Vous n\'êtes pas autorisé à créer un utilisateur.');
        }

        const response = await fetch(envUtils.apiUrl + '/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'utilisateur');
        }

        return await response.json();
    }
}
