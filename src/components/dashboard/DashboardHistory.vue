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
  <div class="history-wrapper" v-if="payments.length > 0 || loading">
    <div v-if="!loading" class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments">
            <td
              :style="
                isOwner(payment.sender) ? { 'font-weight': 'bold' } : null
              "
            >
              {{ payment.sender }}
            </td>
            <td
              :style="
                isOwner(payment.receiver) ? { 'font-weight': 'bold' } : null
              "
            >
              {{ payment.receiver }}
            </td>
            <td>${{ payment.amount }}</td>
            <td>{{ payment.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="loader-wrapper" v-else>
      <Loader size="50px" borderWidth="10px" />
    </div>
    Page: <b>{{ this.page }}</b>
    <div class="pagination">
      <div
        class="button-3"
        :style="loading || this.page <= 1 ? buttonDisabled : null"
        @click="!loading && this.page > 1 && this.page--"
      >
        <img src="@/assets/arrow_left.png" alt="Left arrow" />
      </div>
      <div
        class="button-3"
        :style="loading || this.page >= this.totalPages ? buttonDisabled : null"
        @click="!loading && this.page < this.totalPages && this.page++"
      >
        <img src="@/assets/arrow_right.png" alt="Right arrow" />
      </div>
    </div>
  </div>
  <div v-else>
    <h1>No history!</h1>
  </div>
</template>

<script>
import Payment from "@/models/payment";
import AccountService from "@/services/account.service";
import Loader from "../Loader.vue";

export default {
  name: "DashboardHistory",
  components: {
    Loader,
  },
  methods: {
    isOwner(email) {
      return email === this.$store.getters["auth/email"];
    },
    loadPayments() {
      this.loading = true;
      AccountService.payments(this.page - 1, 5)
        .then((response) => {
          this.payments = [];
          this.totalPages = response.data.totalPages;
          response.data.content.forEach((e) => {
            this.payments.push(
              new Payment(
                e.amount,
                e.sender.email,
                e.receiver.email,
                e.timestamp
              )
            );
          });
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    buttonDisabled() {
      return {
        "pointer-events": "none",
        opacity: "60%",
      };
    },
  },
  watch: {
    page() {
      this.loadPayments();
    },
  },
  mounted() {
    this.loadPayments();
  },
  data() {
    return {
      page: 1,
      totalPages: 0,
      loading: false,
      payments: [],
    };
  },
};
</script>

<style scoped>
@import "@/styles/table-style.css";

.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 167px;
}
</style>
