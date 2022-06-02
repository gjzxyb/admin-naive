<template>
  <el-icon> <component :is="iconname" @click="handleFoldClick" /></el-icon>
</template>

<script lang="ts" setup>
  import { usestore } from '@/store/useStore'
  const store = usestore()
  let iconname = ref('fold')
  const handleFoldClick = () => {
    if (store.isCollapse) {
      store.isCollapse = false
      iconname.value = 'Expand'
    } else {
      store.isCollapse = true
      iconname.value = 'fold'
    }
    return iconname
  }
</script>

<style lang="scss" scoped></style>
