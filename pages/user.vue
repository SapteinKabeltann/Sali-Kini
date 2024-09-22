<template>
  <div class="user-products-container">
    <h2>Dine produkter</h2>
    <div  class="no-products">
      Du har ingen produkter ennå.
    </div>
  </div>
</template>

<script setup>

</script>



<style scoped>

.loading {
  font-size: 1.2rem;
  color: #555;
}

.no-products {
  font-size: 1.1rem;
  color: #777;
}

.user-products-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
}

</style>