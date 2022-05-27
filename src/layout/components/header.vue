<template>
  <n-grid x-gap="0" :cols="2" responsive="self" :item-responsive="true">
    <n-gi>
      <div class="light-green"></div>
    </n-gi>
    <n-gi>
      <div class="green"></div>
    </n-gi>
  </n-grid>
</template>

<style scoped>
  .light-green {
    height: 108px;
    width: 240px;
    background-color: rgba(0, 128, 0, 0.12);
  }
  .green {
    display: flex;
    height: 108px;
    width: 100%;
    background-color: rgba(0, 128, 0, 0.24);
  }
</style>
