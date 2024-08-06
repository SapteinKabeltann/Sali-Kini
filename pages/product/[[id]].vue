<template>
  <div class="product-detail">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
      <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
      <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
    </nav>


    <div class="product-content" v-if="product">
       <img :src="`https://msjupohbqsbqzyjqjdop.supabase.co/storage/v1/object/public/${product.image_url}`" :alt="product.name" class="product-image" />
      <h2>{{ product.description }}</h2>
      <div class="product-description">{{ product.price + "kr" }}</div>
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
.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 2rem;
}

.navbar {
  width: 100%;
  background-color: rgb(37, 129, 136);
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
</style>