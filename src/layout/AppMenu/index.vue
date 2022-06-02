<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="store.isCollapse"
    :router="true"
  >
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <template #title>
        <el-icon><HomeFilled /></el-icon>
        首页
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title
          ><span
            ><el-icon><document /></el-icon></span
        ></template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="2-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
  import { usestore } from '@/store/useStore'
  const store = usestore()
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
  }
</style>

<style lang="scss" scoped>
  .el-menu {
    border-right: none;
    background-color: #304156;
    font-size: medium;
    font-style: #e7e9eb;
  }

  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
  }

  // ::-webkit-scrollbar {
  //   display: none;
  // }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
