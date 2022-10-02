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
  <div class="navbar">
    <div class="content">
      <div class="half">
        <a class="logo" href="https://github.com/yawek9/banking-app"><img src="@/assets/logo.png" alt="Logo"/></a>
        <router-link class="button-1" to="/">Home</router-link>
      </div>
      <div class="half align-end">
        <router-link v-if="isLogged" class="button-1" to="/dashboard">Dashboard</router-link>
        <router-link v-if="!isLogged" class="button-1" to="/login">Log In</router-link>
        <router-link v-if="!isLogged" class="button-1" to="/register">Register</router-link>
        <div v-if="isLogged" @click="logout" class="button-1">Logout</div>
      </div>
    </div>
  </div>
  <div class="mobile-navbar">
    <div class="mobile-nav-top">
      <div class="half">
        <a class="mobile-logo-wrapper" href="https://github.com/yawek9/banking-app">
          <img class="mobile-logo" src="@/assets/logo.png" alt="Logo" />
        </a>
      </div>
      <div class="half align-end">
        <img
          class="nav-main-button"
          :src="
            !mobileOpened
              ? require(`@/assets/hamburger.png`)
              : require(`@/assets/close.png`)
          "
          @click="switchMobileNavbar"
          alt="Navigation"/>
      </div>
    </div>
    <Transition name="nav">
      <div class="mobile-nav-buttons" v-if="mobileOpened">
        <router-link class="mobile-button" to="/">Home</router-link>
        <router-link v-if="isLogged" class="mobile-button" to="/dashboard">Dashboard</router-link>
        <router-link v-if="!isLogged" class="mobile-button" to="/login">Log In</router-link>
        <router-link v-if="!isLogged" class="mobile-button" to="/register">Register</router-link>
        <div v-if="isLogged" @click="logout" class="mobile-button">Logout</div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    switchMobileNavbar() {
      this.mobileOpened = !this.mobileOpened;
    },
  },
  computed: {
    isLogged() {
      return this.$store.getters["auth/isLogged"];
    },
  },
  data() {
    return {
      mobileOpened: false,
    };
  },
};
</script>

<style scoped>
@import "@/styles/ui-style.css";

.navbar {
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #575958;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px,
              rgba(0, 0, 0, 0.12) 0 -12px 30px,
              rgba(0, 0, 0, 0.12) 0 4px 6px,
              rgba(0, 0, 0, 0.17) 0 12px 13px,
              rgba(0, 0, 0, 0.09) 0 -3px 5px;
}

.content {
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
}

.half {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
}

.align-end {
  justify-content: end;
  margin-right: 1vw;
}

.logo {
  width: 50px;
  height: 50px;
}

.navbar img {
  width: 50px;
  height: 50px;
}

.mobile-navbar {
  width: 100%;
  align-items: center;
  display: none;
  position: fixed;
}

@media only screen and (max-width: 900px) {
  .navbar {
    display: none;
  }

  .mobile-navbar {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .mobile-nav-top {
    width: 100vw;
    height: 60px;
    background-color: #575958;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav-buttons {
    width: 100%;
    background-color: #575958;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
  }

  .nav-main-button {
    width: 50px;
    margin: 5px;
    filter: invert(97%) sepia(46%) saturate(1470%) hue-rotate(66deg)
            brightness(88%) contrast(82%) drop-shadow(1px 1px 2px #3c3c3c);
  }

  .mobile-logo-wrapper {
    margin: 15px;
    width: 50px;
    height: 50px;
  }

  .mobile-logo {
    width: 50px;
    height: 50px;
  }

  .nav-enter-active,
  .nav-leave-active {
    transition: max-height 0.2s ease;
    max-height: 200px;
  }

  .nav-enter-from,
  .nav-leave-to {
    max-height: 1px;
    padding: 0;
  }

  .nav-enter-active .mobile-button,
  .nav-leave-active .mobile-button {
    transition: opacity 0.1s ease;
    opacity: 1;
  }

  .nav-enter-from .mobile-button,
  .nav-leave-to .mobile-button {
    opacity: 0;
  }
}
</style>
