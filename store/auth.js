import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            jwtToken: null,
            expire: null,
            company: null
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.jwtToken,
        authUser(state) {
            if (!!state.jwtTokenz) {
                return state.company
            } else {
                return null
            }
        },
        authCompany(state) {
            if (!!state.jwtToken) {
                return state.company
            } else {
                return null
            }
        }
    },
    actions: {
        setToken(data) {
            this.jwtToken = data.token;
            this.expire = data.expiresIn
            this.company = data.data;
        },
        clearToken() {
            this.jwtToken = null;
            this.expire = null;
            this.company = null;
        },
    },
});