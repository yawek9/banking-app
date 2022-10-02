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
  <div class="loan-wrapper">
    <h2>Loan</h2>
    <form v-if="!loading" @submit.prevent="handleTakingLoan">
      Amount: ${{ this.amount }}
      <input type="range" min="500" max="100000" step="500" v-model="amount" />
      Repayment date: {{ this.repaymentDate }}<br />
      Repayment amount: ${{ this.repaymentAmount }}
      <div class="feedback" v-if="status === 0"></div>
      <div class="feedback" v-if="status === 1">
        You have successfully taken out a loan! Good luck!
      </div>
      <div class="feedback" v-if="status === 2">
        You can't take that high loan! You are exceeding our trust!
      </div>
      <div class="feedback" v-if="status === 3">Unexpected error occurred!</div>
      <button>Request</button>
    </form>
    <div class="loader-wrapper" v-if="loading">
      <Loader size="50px" borderWidth="12px" />
    </div>
  </div>
</template>

<script>
import Loader from "../Loader.vue";
import AccountService from "@/services/account.service";

export default {
  name: "DashboardLoan",
  components: {
    Loader,
  },
  methods: {
    setRepaymentDate(yearsFromNow) {
      let date = new Date();
      date.setFullYear(date.getFullYear() + yearsFromNow);
      this.repaymentDate = date.toLocaleDateString();
    },
    updateRepaymentAmount() {
      this.repaymentAmount = this.amount * 1.25;
    },
    handleTakingLoan() {
      this.loading = true;
      AccountService.takeLoan(this.amount)
        .then((response) => {
          this.status = 1;
        })
        .catch((error) => {
          switch (error.response.status) {
            case 423:
              this.status = 2;
              break;
            default:
              this.status = 3;
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    status() {
      if (this.statusTask) clearTimeout(this.statusTask);
      this.statusTask = setTimeout(() => {
        this.status = 0;
      }, 5000);
    },
    amount() {
      this.setRepaymentDate(this.amount / 500);
      this.updateRepaymentAmount();
    },
  },
  mounted() {
    this.setRepaymentDate(1);
    this.updateRepaymentAmount();
  },
  data() {
    return {
      status: 0,
      statusTask: null,
      loading: false,
      amount: 500.0,
      repaymentDate: null,
      repaymentAmount: 625.0,
    };
  },
};
</script>

<style scoped>
@import "@/styles/form-style.css";

.loan-wrapper h2 {
  line-height: 60px;
  color: #575958;
}

.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
}
</style>
