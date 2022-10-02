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

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DashboardSummary from "@/components/dashboard/DashboardSummary.vue";
import DashboardHistory from "@/components/dashboard/DashboardHistory.vue";
import DashboardTransfer from "@/components/dashboard/DashboardTransfer.vue";
import DashboardLoan from "@/components/dashboard/DashboardLoan.vue";
import DashboardLoanList from "@/components/dashboard/DashboardLoanList.vue";
import store from "@/store/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      notLoggedRequired: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      notLoggedRequired: true,
    },
  },
  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      {
        name: "dashboard",
        path: "",
        component: DashboardSummary,
      },
      {
        path: "/dashboard/transfer",
        component: DashboardTransfer,
      },
      {
        path: "/dashboard/history",
        component: DashboardHistory,
      },
      {
        path: "/dashboard/loan",
        component: DashboardLoan,
      },
      {
        path: "/dashboard/loans",
        component: DashboardLoanList,
      },
    ],
    meta: {
      loggedRequired: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.matched.some((e) => e.meta.loggedRequired)) {
    if (!store.getters["auth/isLogged"]) return { name: "login" };
  } else if (to.matched.some((e) => e.meta.notLoggedRequired)) {
    if (store.getters["auth/isLogged"]) return { name: "dashboard" };
  }
});

export default router;
