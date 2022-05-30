<template>
  <el-menu
    :unique-opened="false"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="rgba(255, 255, 255, 0.7)"
    active-text-color="#2d8cf0"
    :collapse="usestore.state.isCollapse"
    router
  >
    <menu-item v-for="menu in usestore.state.menus" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<script lang="ts" setup>
  //import MenuItem from './MenuItem.vue'
  import { usestore } from '@store/usestore'
</script>

<style lang="scss" scoped>
  .el-menu {
    border-right: none;
  }

  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  // ::-webkit-scrollbar {
  //   display: none;
  // }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
