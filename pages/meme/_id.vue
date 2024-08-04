<template>
  <div class="product-detail">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
      <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
      <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
    </nav>
    <div class="product-content" v-if="meme">
      <img :src="meme.url" alt="" class="product-image" />
      <h2>{{ meme.name }}</h2>
      <p>Mer beskrivelse om memen...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const meme = ref(null);

const fetchMeme = async (id) => {
  try {
    const response = await axios.get('https://api.imgflip.com/get_memes');
    const memes = response.data.data.memes;
    meme.value = memes.find((m) => m.id == id);
  } catch (error) {
    console.error('Feil ved henting av meme:', error);
  }
};

onMounted(() => {
  fetchMeme(route.params.id);
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