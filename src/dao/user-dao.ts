import User from "@/models/user";
import {envUtils} from "@/config/env-utils";
import {daoUtils} from "@/dao/dao-utils";

export const userDao = {
  getUsers: async (user: User): Promise<any[]> => {
    if (!user.isAdmin()) {
      return [];
    }
    const response = await fetch(envUtils.apiUrl + `/api/user`, {
      method: 'GET',
      headers: daoUtils.getHeaders()
    });

    const jsonData: User[] = await response.json();
    const tabUsers = [];
    for (const user of jsonData) {
      tabUsers.push(new User(user))
    }
    return tabUsers;
  },
  getUserById: async (userId: number): Promise<User> => {
    const response = await fetch(`${envUtils.apiUrl}/api/user/${userId}`, {
      method: 'GET',
      headers: daoUtils.getHeaders()
    });
    return new User(await response.json());
  },
  deleteUser: async (userId: number): Promise<User> => {
    const response = await fetch(`${envUtils.apiUrl}/api/user/${userId}`, {
      method: 'DELETE',
      headers: daoUtils.getHeaders()
    });
    return await response.json();
  },
  getAllTechnicians: async (): Promise<User[]> => {
    const response = await fetch(envUtils.apiUrl + `/api/user/technician`, {
      method: 'GET',
      headers: daoUtils.getHeaders()
    });

    const jsonData: User[] = await response.json();
    return jsonData.map(userJson => new User(userJson));
  },

  createUser: async (formUser: Partial<User>): Promise<User> => {
    const response = await fetch(envUtils.apiUrl + '/api/user', {
      method: 'POST',
      headers: daoUtils.getHeaders(),
      body: JSON.stringify(formUser),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'utilisateur');
    }

    return new User(await response.json());
  },

  updateUser: async (userId: number, updatedData: Partial<User>): Promise<User> => {
    const response = await fetch(`${envUtils.apiUrl}/api/user/${userId}`, {
      method: 'PATCH',
      headers: daoUtils.getHeaders(),
      body: JSON.stringify(updatedData)
    });
    return new User(await response.json());
  },

  getAllClients : async (): Promise<User[]> => {
    const response = await fetch(envUtils.apiUrl + `/api/user/client`, {
      method: 'GET',
      headers: daoUtils.getHeaders()
    });

    const jsonData: User[] = await response.json();
    return jsonData.map(userJson => new User(userJson));
  },
}
