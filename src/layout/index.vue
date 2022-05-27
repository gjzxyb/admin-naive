<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header :inverted="inverted" bordered position:absolute style="height: 60px">
        <headervue />
        <n-space> <n-switch v-model:value="inverted" /> inverted </n-space>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          :inverted="inverted"
          style="height: 100vh"
        >
          <appmenuVue />
        </n-layout-sider>
        <n-layout style="height: 100vh"> <router-view /> </n-layout>
      </n-layout>
      <n-layout-footer :inverted="inverted" bordered> Footer Footer Footer </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
  import appmenuVue from './components/appmenu.vue'
  import headervue from './components/header.vue'
  const inverted = ref(false)
</script>
