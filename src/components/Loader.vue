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
  <div :style="loaderStyle" class="loader"></div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    size: {
      type: String,
      default: "30px",
    },
    borderWidth: {
      type: String,
      default: "5px",
    },
  },
  computed: {
    loaderStyle() {
      return {
        width: this.size,
        height: this.size,
        border: this.borderWidth + " solid white",
        "border-top": this.borderWidth + " solid #575958",
      };
    },
  },
};
</script>

<style scoped>
.loader {
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
