import {useAuthStore} from "@/stores/auth-store";

export const daoUtils = {
  getHeaders: (withAuth: boolean = true) => {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (withAuth) {
      headers['Authorization'] = `Bearer ${useAuthStore().getToken()}`
    }

    return headers;
  }
}