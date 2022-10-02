<!--
  - This file is part of Banking App, licensed under GNU GPLv3 license.
  - Copyright (C) 2022 yawek9
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <div class="background">
    <div class="main-title">
      <h1>Welcome to our bank!</h1>
      <div v-if="!isLogged">
        <h2>
          Don't have an account?
          <router-link style="color: inherit" to="/register">Register</router-link>
          it now!
        </h2>
      </div>
      <div v-else>
        <h2>
          Go to the
          <router-link style="color: inherit" to="/dashboard">dashboard</router-link>
          to access your account.
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    isLogged() {
      return this.$store.getters["auth/isLogged"];
    },
  },
};
</script>

<style scoped>
@import "@/styles/background-style.css";

.main-title {
  width: 50vw;
  background-color: #57cf88;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  line-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main-title h1 {
  margin-bottom: 0;
}

@media only screen and (max-width: 900px) {
  .main-title {
    width: 85%;
    line-height: normal;
    padding: 20px 5px;
  }
}
</style>
