/*
 * This file is part of Banking App, licensed under GNU GPLv3 license.
 * Copyright (C) 2022 yawek9
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { createStore } from "vuex";
import AuthService from "@/services/auth.service";
import router from "@/router";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { loggedIn: true, email: user.email }
  : { loggedIn: false, email: null };

export default createStore({
  modules: {
    auth: {
      namespaced: true,
      state: initialState,
      actions: {
        register({}, user) {
          return AuthService.register(user).then(
            (response) => {
              return Promise.resolve(response.data);
            },
            (error) => {
              return Promise.reject(error);
            }
          );
        },
        login({ state, commit }, user) {
          return AuthService.login(user).then(
            (response) => {
              commit("loginSuccess", user.email);
              return Promise.resolve(response.data);
            },
            (error) => {
              return Promise.reject(error);
            }
          );
        },
        logout({ commit }) {
          localStorage.removeItem("user");
          commit("logoutSuccess");
          router.push("/");
        },
      },
      getters: {
        isLogged(state) {
          return state.loggedIn === true;
        },
        email(state) {
          return state.email;
        },
      },
      mutations: {
        loginSuccess(state, email) {
          state.loggedIn = true;
          state.email = email;
        },
        logoutSuccess(state) {
          state.loggedIn = false;
          state.email = null;
        },
      },
    },
  },
});
