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

import client from "./http/client";

class AccountService {
  balance() {
    return client.get("/user/balance");
  }

  transfer(email, amount) {
    return client.post("/payment/pay", {
      receiver: email,
      amount: amount,
    });
  }

  payments(page, size) {
    return client.get(
      "/payment/payments?page=" + page + "&size=" + size + "&sort=timestamp,desc"
    );
  }

  takeLoan(amount) {
    return client.post("/loan/take", {
      amount: amount,
    });
  }

  loans(page, size) {
    return client.get(
      "/loan/loans?page=" + page + "&size=" + size + "&sort=repaymentDate"
    );
  }
}

export default new AccountService();
