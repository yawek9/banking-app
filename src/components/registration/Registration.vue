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
    <div class="form-wrapper" v-bind:style="loading ? loadingStyle : null">
      <h1>Sign up</h1>
      <img src="@/assets/user.png" alt="User" />
      <div v-if="status !== 3">
        <form @submit.prevent="handleRegister">
          Email:
          <input type="email" v-model="email" required />
          Password:
          <input type="password" minlength="6" maxlength="50" v-model="password" required />
          <div class="feedback" v-if="status === 0"></div>
          <div class="feedback" v-if="status === 1">
            Account with that email already exists!
          </div>
          <div class="feedback" v-if="status === 2">
            Unexpected error occurred!
          </div>
          <button>Register</button>
        </form>
      </div>
      <div v-else>
        <h2>Registered successfully!</h2>
        <h3>
          You can
          <router-link style="color: inherit" to="/login">login</router-link>
          now.
        </h3>
      </div>
      <div v-if="loading" class="loader-wrapper">
        <Loader size="40px" borderWidth="8px" />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import User from "@/models/user";

export default {
  name: "Registration",
  components: {
    Loader,
  },
  methods: {
    handleRegister() {
      this.status = 0;
      this.loading = true;
      this.$store
        .dispatch("auth/register", new User(this.email, this.password))
        .then(
          (data) => {
            this.status = 3;
          },
          (error) => {
            switch (error.response.status) {
              case 409:
                this.status = 1;
                break;
              default:
                this.status = 2;
            }
          }
        )
        .then(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    loadingStyle() {
      return {
        filter: "brightness(60%)",
      };
    },
  },
  watch: {
    status() {
      if (this.statusTask) clearTimeout(this.statusTask);
      this.statusTask = setTimeout(() => {
        this.status = 0;
      }, 5000);
    },
  },
  data() {
    return {
      status: 0,
      statusTask: null,
      email: "",
      password: "",
      loading: false,
    };
  },
};
</script>

<style scoped>
@import "@/styles/background-style.css";
@import "@/styles/form-style.css";

.form-wrapper {
  min-height: 40%;
  transition: 0.1s;
  border-radius: 4px;
}

.loader-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
