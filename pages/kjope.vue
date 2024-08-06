<template>
  <div class="container">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
      <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
      <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
    </nav>
    <h2>Produkter til salgs</h2>
    <div class="product-grid">
      <div v-for="product in paginatedVarer" :key="product.id" class="product-card">
        <NuxtLink :to="`/product/${product.id}`">
          <img :src="`https://msjupohbqsbqzyjqjdop.supabase.co/storage/v1/object/public/${product.image_url}`" :alt="product.name" class="product-image" />
          <div class="product-description">{{ product.name }}</div>
          <div class="product-description">{{ product.price + "kr" }}</div>
        </NuxtLink>
      </div>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Forrige</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Neste</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const varer = ref([]);
const currentPage = ref(1);
const varerPerPage = 30;

const totalPages = computed(() => Math.ceil(varer.value.length / varerPerPage));

const paginatedVarer = computed(() => {
  const start = (currentPage.value - 1) * varerPerPage;
  return varer.value.slice(start, start + varerPerPage);
});

//dette er gold standar  til fek update/ insert/ delete vise versa..   -sølve 
const fetchProducts = async () => {

  const { data, error } = await supabase
    .from('products')
    .select("*")

  if(error) {
    console.error("finner ikke produkter" , error);
    return
  }
  
  varer.value = data  
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>

body {
  overflow: hidden; /* Hindre scroll ved å skjule overflødig innhold */
}

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

.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
}

.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  border-radius: 12px;
}

.product-description {
  margin-top: 0.5rem;
  font-size: 1rem;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: rgb(238, 216, 183);
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>