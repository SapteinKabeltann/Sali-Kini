<template>
  <div class="container">
    <div>
      <img src="/img/Sali Kini2.jpg" alt="">
    </div>
    <h2>Hva ønsker du å gjøre {{user.email}}?</h2>
    <div class="button-container">
      <NuxtLink to="/selge" class="button">
        Selge vare
      </NuxtLink>
      <NuxtLink to="/kjope" class="button">
        Kjøpe vare
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
</script>

<script>
export default {
  layout: 'fullpage',
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  background-color: rgb(226, 213, 194);
  min-height: 100vh; 
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
}

.button {
  background-color: rgb(103, 72, 25);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.2rem;
  text-align: center;
  width: fit-content;
}
</style>
