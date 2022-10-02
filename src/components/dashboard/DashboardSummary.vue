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
  <div class="summary-wrapper">
    <h1>Balance:</h1>
    <div class="loader-wrapper" v-if="loading">
      <Loader size="50px" borderWidth="12px" />
    </div>
    <span v-if="!loading" class="number">${{ balance.split(".")[0] }}.</span>
    <span v-if="!loading" class="decimal">{{ balance.split(".")[1] }}</span>
  </div>
</template>

<script>
import AccountService from "@/services/account.service";
import Loader from "../Loader.vue";

export default {
  name: "DashboardSummary",
  components: {
    Loader,
  },
  data() {
    return {
      balance: (0).toFixed(2),
      loading: true,
    };
  },
  mounted() {
    AccountService.balance()
      .then((response) => {
        this.balance = response.data.toFixed(2);
      })
      .then(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.summary-wrapper h1 {
  line-height: 60px;
  color: #575958;
}

.summary-wrapper .number {
  font-size: 80px;
  line-height: 80px;
}

.summary-wrapper .decimal {
  font-size: 65px;
  line-height: 80px;
}

.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 900px) {
  .summary-wrapper h1 {
    font-size: 40px;
    line-height: 30px;
    color: #575958;
  }

  .summary-wrapper .number {
    font-size: 40px;
  }

  .summary-wrapper .decimal {
    font-size: 30px;
  }
}
</style>
