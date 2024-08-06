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
      <img :src="`https://msjupohbqsbqzyjqjdop.supabase.co/storage/v1/object/public/${product.image_url}`" alt="Produktbilde" class="uploaded-image" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '@/lib/initSupabase';

export default {
  setup() {
    const product = ref({
      name: '',
      description: '',
      price: null,
      image_url: ''
    });
    const submitted = ref(false);
    const file = ref(null);

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const submitProduct = async () => {
      try {
        if (file.value) {
          // Erstatt spesialtegn med underscore i filnavn
          const fileName = file.value.name.replace(/[^a-zA-Z0-9.]/g, '_'); 
          const filePath = `${Date.now()}_${fileName}`;

          // Last opp filen til Supabase storage
          const { data, error } = await supabase
            .storage
            .from('varer')
            .upload(filePath, file.value);

          if (error) {
            throw error;
          }

      // Lagre image URL til produkt
      product.value.image_url = `varer/${filePath}`;
    }
    

        // Lagrer produktinformasjonen i Supabase tabellen "products"
        const { error: insertError } = await supabase
          .from('products')
          .insert([{
            name: product.value.name,
            description: product.value.description,
            price: product.value.price,
            image_url: product.value.image_url
          }]);

        if (insertError) {
          throw insertError;
        }

        submitted.value = true;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
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
