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

import client from "./client";
import TokenService from "../token.service";
import store from "@/store";

const authRequiredUrls = ["/user", "/payment", "/loan"];

const setupInterceptors = () => {
  client.interceptors.request.use(
    (config) => {
      const url = config.url;
      if (!authRequiredUrls.some((path) => url.startsWith(path)))
        return config;

      const token = TokenService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (!error.response) return;

      const config = error.config;
      const url = config.url;

      if (
        !authRequiredUrls.some((path) => url.startsWith(path)) ||
        error.response.status !== 401
      ) return Promise.reject(error);

      config._retry = true;
      try {
        const refreshResponse = await client.post("/auth/refresh-token", {
          refreshToken: TokenService.getRefreshToken(),
          email: store.getters["auth/email"],
        });
        const accessToken = refreshResponse.data.accessToken;
        const refreshToken = refreshResponse.data.refreshToken;
        TokenService.updateTokens(accessToken, refreshToken);

        return client(config);
      } catch (refreshError) {
        await store.dispatch("auth/logout");
      }
    }
  );
};

export default setupInterceptors;
