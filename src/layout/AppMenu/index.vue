<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="store.isCollapse">
    <el-menu-item index="1">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
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
    <el-menu-item index="3">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="4" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
  import { usestore } from '@/store/useStore'
  const store = usestore()
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

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
