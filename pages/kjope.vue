<template>
  <div class="container">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
      <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
      <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
    </nav>

    <div class="search-form">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Søk etter produkter..."
        @keyup.enter="searchProducts" 
      />
      <button class="search-button" @click="searchProducts">Søk</button>
    </div>

    <h2>Produkter til salgs</h2>
    <div class="product-grid">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <NuxtLink :to="`/product/${product.id}`">
          <img height="300px" :src="`https://msjupohbqsbqzyjqjdop.supabase.co/storage/v1/object/public/${product.image_url}`" :alt="product.name" class="product-image" />
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
import { ref, computed, onMounted, watch } from 'vue';

const supabase = useSupabaseClient();
const products = ref([]); // Produkter som vises på siden
const searchQuery = ref(""); // Søkespørring
const currentPage = ref(1);
const varerPerPage = 30;

const totalPages = computed(() => Math.ceil(products.value.length / varerPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * varerPerPage;
  return products.value.slice(start, start + varerPerPage);
});

const fetchProducts = async (query = "") => {
  let { data, error } = await supabase
    .from('products')
    .select("*");

  if (query) {
    data = data.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (error) {
    console.error("Finner ikke produkter", error);
    return;
  }

  products.value = data;
};

const searchProducts = () => {
  currentPage.value = 1; // Tilbakestill til første side ved nytt søk
  fetchProducts(searchQuery.value); // Hent produkter basert på søkespørring
};

// Watcher for å overvåke endringer i søkefeltet
watch(searchQuery, (newQuery) => {
  if (newQuery.trim() === "") {
    fetchProducts(); // Hvis søkefeltet er tomt, hent alle produkter igjen
  }
});

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
  fetchProducts(); // Hent alle produkter ved initiering
});
</script>

<style scoped>
/* Fjern standard margin og padding */
body, html {
  margin: 0;
  padding: 0;
}

/* Fiks for å hindre hvit linje mellom navbar og container */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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
  min-height: 178vh; /* Endret fra 98vh til 100vh */
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
  margin: 0; /* Sørg for at navbaren ikke har margin */
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
  padding: 0.5rem 0.5rem;
  font-size: 0.7rem;
  border: none;
  border-radius: 5px;
  background-color: rgb(103, 72, 25);
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
