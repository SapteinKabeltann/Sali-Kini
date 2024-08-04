<template>
  <div class="product-detail">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
      <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
      <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
    </nav>
    <div class="product-content" v-if="product">
      <img :src="product.image" alt="" class="product-image" />
      <h2>{{ product.description }}</h2>
      <p>Mer beskrivelse om produktet...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref(null);

const fetchProduct = (id) => {
  // Dummy data for demonstration
  const productData = [
    { id: 1, image: 'path/to/image1.jpg', description: 'Produkt 1' },
    { id: 2, image: 'path/to/image2.jpg', description: 'Produkt 2' },
    { id: 3, image: 'path/to/image3.jpg', description: 'Produkt 3' },
    // ... flere produkter
  ];
  product.value = productData.find((p) => p.id === parseInt(id));
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