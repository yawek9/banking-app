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
    <div class="form-wrapper">
      <div class="user-info">
        <div class="user-email">
          {{ email }}
        </div>
        <div class="user-image">
          <img src="@/assets/avatar-default.png" width="100" alt="User" />
        </div>
      </div>
      <div class="tabs-wrapper">
        <router-link class="button-2" to="/dashboard">Summary</router-link>
        <router-link class="button-2" to="/dashboard/transfer">Transfer</router-link>
        <router-link class="button-2" to="/dashboard/history">History</router-link>
        <router-link class="button-2" to="/dashboard/loan">Loan</router-link>
        <router-link class="button-2" to="/dashboard/loans">Loans</router-link>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      email: this.$store.getters["auth/email"],
    };
  },
};
</script>

<style scoped>
@import "@/styles/background-style.css";
@import "@/styles/form-style.css";
@import "@/styles/ui-style.css";

.form-wrapper {
  height: auto;
  width: auto;
  padding: 25px 20px;
  min-width: 800px;
}

.tabs-wrapper {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.button-2 {
  width: 120px;
}

.tabs-wrapper .router-link-exact-active {
  background-color: #575958;
  color: white;
}

.content {
  height: auto;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 330px;
}

.user-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
  width: calc(100% - 60px);
  padding: 25px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
}

.user-email {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #575958;
}

.user-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 900px) {
  .form-wrapper {
    min-width: 85%;
  }

  .user-info {
    width: 85%;
  }

  .user-email {
    font-size: 14px;
  }
}
</style>
