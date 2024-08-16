<template>
  <div class="product-detail">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
      <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
      <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
    </nav>


    <div class="product-content" v-if="product">
      <img height="400px" :src="`https://msjupohbqsbqzyjqjdop.supabase.co/storage/v1/object/public/${product.image_url}`" :alt="product.name" class="product-image" />
        <div class="description-container">
          <p>{{ product.description }}</p>
        </div> 
      <div class="bold-text" font-weight="bold">Pris: {{ product.price + "kr" }}</div>


      <div class="button-container">
        <NuxtLink to="/kjopvare" class="button">
          Kjøp
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const supabase = useSupabaseClient();
const route = useRoute();
const product = ref(null);

const fetchProduct = async (id) => {

  const { data, error } = await supabase
    .from('products')
    .select("*")
    .eq('id', id)
    .maybeSingle()

  if(error) {
    console.error("finner ikke produkt id" , error);
    return
  }
  
  product.value = data 
};

onMounted(() => {
  fetchProduct(route.params.id);
});
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
  min-height: 98vh;
}

.product-detail {
  background-color: rgb(226, 213, 194);
  min-height: 98vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 2rem;
}

.description-container {
    width: 80%; 
    margin: 2rem auto; 
    padding: 20px; 
    background-color: #f5f5f5; 
    border-radius: 8px;
    text-align: center; 
}

.navbar {
  width: 100%;
  background-color: rgb(170, 146, 111);
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  position: absolute;
  top: 0;
  left: 0;
}

.nav-link {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1.2rem;
}

.product-content {
  margin-top: 5rem;
}

.product-image {
  max-width: 100%;
  border-radius: 12px;
}

h2 {
  margin-top: 1rem;
  font-size: 2rem;
}

p {
  margin-top: 1rem;
  font-size: 1.2rem;
}

.bold-text {
    font-weight: bold;
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
  font-size: 1rem;
  text-align: center;
  width: fit-content;
}

</style>