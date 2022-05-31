<template>
  <i :class="collapseIcon" @click="handleCollapse"></i>
</template>

<script lang="ts" setup>
  import { usestore } from '@/store/useStore'
  import { computed } from 'vue'

  const store = usestore()

  const collapseIcon = computed(() => {
    return !store.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'
  })

  const handleCollapse = () => {
    store.commit('setIsCollapse', !store.isCollapse)
  }
</script>

<style lang="scss" scoped></style>
