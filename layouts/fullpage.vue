<!-- layouts/fullpage.vue -->
<template>
  <div class="fullpage-container">
    <slot />
  </div>
</template>

<style scoped>
.fullpage-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>