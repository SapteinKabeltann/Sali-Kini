<template>
  <div class="container">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
      <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
      <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
    </nav>
    <h1>Salgsside</h1>

    <form @submit.prevent="submitProduct" class="product-form">
      <div class="form-group">
        <label for="productName">Navn på produktet:</label>
        <input type="text" v-model="product.name" id="productName" required />
      </div>

      <div class="form-group">
        <label for="productDescription">Beskrivelse:</label>
        <textarea v-model="product.description" id="productDescription" required></textarea>
      </div>

      <div class="form-group">
        <label for="productPrice">Pris:</label>
        <input type="number" v-model="product.price" id="productPrice" required min="0" />
      </div>

      <div class="form-group">
        <label for="productImage">Last opp bilde:</label>
        <input type="file" @change="handleFileUpload" id="productImage" accept="image/*" required />
      </div>

      <button type="submit" class="submit-button">Legg til produkt</button>
    </form>

    <div v-if="submitted" class="confirmation">
      <h2>Produktet er lagt til!</h2>
      <p><strong>Navn:</strong> {{ product.name }}</p>
      <p><strong>Beskrivelse:</strong> {{ product.description }}</p>
      <p><strong>Pris:</strong> {{ product.price }} NOK</p>
      <img :src="product.imageUrl" alt="Produktbilde" class="uploaded-image" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const product = ref({
      name: '',
      description: '',
      price: null,
      imageUrl: ''
    });
    const submitted = ref(false);

    // Håndter bildeopplasting
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          product.value.imageUrl = e.target.result; // Lagre bildet som en URL
        };
        reader.readAsDataURL(file);
      }
    };

    const submitProduct = () => {
      // Her kan du legge til logikk for å sende produktet til backend eller annen behandling
      submitted.value = true; // Sett submitted til true for å vise bekreftelse
    };

    return {
      product,
      submitted,
      handleFileUpload,
      submitProduct
    };
  }
};
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

.product-form {
  width: 100%;
  max-width: 600px;
  margin: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.submit-button {
  background-color: rgb(103, 72, 25);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirmation {
  margin-top: 20px;
}

.uploaded-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>
