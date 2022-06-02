<template>
  <el-icon> <component :is="iconname" @click="changeicon" /></el-icon>
</template>

<script lang="ts" setup>
  let iisCollapse = ref(false)
  let iconname = ref('fold')
  const changeicon = () => {
    if (iisCollapse.value) {
      iisCollapse.value = false
      iconname.value = 'Expand'
    } else {
      iisCollapse.value = true
      iconname.value = 'fold'
    }
    return iconname
  }
</script>

<style lang="scss" scoped></style>
