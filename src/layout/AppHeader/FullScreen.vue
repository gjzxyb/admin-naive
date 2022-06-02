<template>
  <div style="font-size: 20px">
    <Notebook style="width: 1em; height: 1em; margin-right: 8px" @click="toggleFullScreen" />
  </div>
</template>
<script lang="ts" setup>
  import screenfull from 'screenfull'
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }
</script>

<style lang="scss" scoped></style>
