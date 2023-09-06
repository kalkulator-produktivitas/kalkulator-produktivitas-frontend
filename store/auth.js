import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        jwtToken: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.jwtToken,
        authUser(state) {
            if (!!state.jwtToken) {
                return state.jwtToken.user
            } else {
                return null
            }
        },
    },
    actions: {
        setToken(token) {
            this.jwtToken = token;
        },
        clearToken() {
            this.jwtToken = null;
        },
    },
});