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
  <div class="transfer-wrapper">
    <h2>Transfer</h2>
    <form v-if="!loading" @submit.prevent="handleTransfer">
      Recipient:
      <input type="email" v-model="recipient" required />
      Amount:
      <input
        :style="!amountCorrect ? inputStyle : null"
        v-model="amount"
        required
      />
      <div class="feedback" v-if="status === 0"></div>
      <div class="feedback" v-if="status === 1">
        Transfer has been sent successfully!
      </div>
      <div class="feedback" v-if="status === 2">
        Account with that email cannot be found!
      </div>
      <div class="feedback" v-if="status === 3">Not enough balance!</div>
      <div class="feedback" v-if="status === 4">Unexpected error occurred!</div>
      <button
        :disabled="!amountCorrect"
        :style="!amountCorrect ? noPointerEvents : null"
      >
        Request
      </button>
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
  name: "DashboardTransfer",
  components: {
    Loader,
  },
  methods: {
    handleTransfer() {
      this.loading = true;
      AccountService.transfer(
        this.recipient,
        parseFloat(this.amount.replaceAll("$", ""))
      )
        .then((response) => {
          this.status = 1;
        })
        .catch((error) => {
          switch (error.response.status) {
            case 404:
              this.status = 2;
              break;
            case 400:
              this.status = 3;
              break;
            default:
              this.status = 4;
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
    amount(newVal, oldVal) {
      if (!newVal) {
        this.amountCorrect = false;
        return;
      }
      newVal = newVal.replaceAll("$", "");
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (!regex.test(newVal)) {
        this.amountCorrect = false;
        return;
      }
      if (newVal.includes(".")) {
        this.amount =
          "$" + newVal.split(".")[0] + "." + newVal.split(".")[1].slice(0, 2);
        this.amountCorrect = true;
        return;
      }
      if (!newVal.includes("$")) this.amount = "$" + newVal;
      if (newVal.length === 0) {
        this.amountCorrect = false;
        return;
      }
      this.amountCorrect = true;
    },
  },
  computed: {
    inputStyle() {
      return {
        border: "1px solid red",
      };
    },
    noPointerEvents() {
      return {
        "pointer-events": "none",
      };
    },
  },
  data() {
    return {
      status: 0,
      statusTask: null,
      loading: false,
      recipient: "",
      amount: "$1.0",
      amountCorrect: true,
    };
  },
};
</script>

<style scoped>
@import "@/styles/form-style.css";

.transfer-wrapper h2 {
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
