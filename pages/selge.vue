<template>
  <div class="container">
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
      <p><strong>PLU:</strong> {{ product.plu }}</p>
      <svg id="barcode"></svg> <!-- Legg til et element for strekkoden -->
      <button @click="generatePDF">Last ned PDF</button> 
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { supabase } from '@/lib/initSupabase';
import { v4 as uuidv4 } from 'uuid'; 
import JsBarcode from 'jsbarcode'; 
import jsPDF from 'jspdf';

const product = ref({
  name: '',
  description: '',
  price: null,
  image_url: '',
  plu: '' 
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

    // Generer en unik PLU-kode
    product.value.plu = uuidv4(); // Bruk UUID-biblioteket for å generere kode

    // Lagre produktinformasjonen i Supabase tabellen "products"
    const { error: insertError } = await supabase
      .from('products')
      .insert([{
        name: product.value.name,
        description: product.value.description,
        price: product.value.price,
        image_url: product.value.image_url,
        plu: product.value.plu 
      }]);

    if (insertError) {
      throw insertError;
    }

    submitted.value = true;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

// Funksjon for å konvertere SVG til Data URL
const svgToDataUrl = (svgElement) => {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

// Funksjon for å generere strekkoden
const generateBarcode = () => {
  const barcodeElement = document.getElementById('barcode');
  if (barcodeElement) {
    JsBarcode("#barcode", product.value.plu, {
      format: "CODE128",
      lineColor: "#0aa",
      width: 2,
      height: 100,
      displayValue: true
    });
  }
};

const generatePDF = () => {
  const doc = new jsPDF();
  const barcodeElement = document.getElementById('barcode');
  
  if (barcodeElement) {
    const barcodeDataUrl = svgToDataUrl(barcodeElement);

    // Lag PDF
    doc.text('Produkt Detaljer', 10, 10);
    doc.text(`Navn: ${product.value.name}`, 10, 20);
    doc.text(`Beskrivelse: ${product.value.description}`, 10, 30);
    doc.text(`Pris: ${product.value.price} NOK`, 10, 40);
    doc.text(`PLU: ${product.value.plu}`, 10, 50);
    doc.addImage(barcodeDataUrl, 'SVG', 10, 60, 180, 20); // Legg til strekkoden i PDF

    doc.save('product-details.pdf');
  } else {
    console.error('Barcode element not found!');
  }
};

// Generer strekkode og PDF etter at komponenten er montert
watch(submitted, async (newValue) => {
  if (newValue) {
    await nextTick(); // Vent på at DOM-en skal oppdateres
    generateBarcode();
  }
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
  min-height: 100vh; /* Endret fra 178vh til 100vh */
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
