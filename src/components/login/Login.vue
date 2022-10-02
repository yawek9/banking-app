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
      <h1>Log In</h1>
      <img src="../../assets/user.png" alt="User" />
      <div>
        <form @submit.prevent="handleLogin">
          Email:
          <input type="email" v-model="email" required />
          Password:
          <input type="password" minlength="6" maxlength="50" v-model="password" required />
          <div class="feedback" v-if="status === 0"></div>
          <div class="feedback" v-if="status === 1">Wrong password!</div>
          <div class="feedback" v-if="status === 2" style="height: 60px">
            Account with that email does not exist.<br />
            Don't have an account?
            <router-link style="color: inherit" to="/register">Register</router-link>
            it now!
          </div>
          <div class="feedback" v-if="status === 3">
            Unexpected error occurred!
          </div>
          <button>Login</button>
        </form>
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
  name: "Login",
  components: {
    Loader,
  },
  methods: {
    handleLogin() {
      this.status = 0;
      this.loading = true;
      this.$store
        .dispatch("auth/login", new User(this.email, this.password))
        .then(
          (data) => {
            localStorage.setItem("user", JSON.stringify(data));
            this.$router.push("/dashboard");
          },
          (error) => {
            switch (error.response.status) {
              case 401:
                this.status = 1;
                break;
              case 404:
                this.status = 2;
                break;
              default:
                this.status = 3;
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
