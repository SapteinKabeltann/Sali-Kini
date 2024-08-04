<template>
  <div>
    <h1>Test Supabase Connection</h1>
  </div>
</template>

<script>
import { onMounted } from 'vue'; // Importer onMounted
import { supabase } from '@/lib/initSupabase'; // Pass på at du importerer fra den riktige banen

export default {
  setup() {
    const testConnection = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Data fetched successfully:', data);
      }
    };

    // Kall testConnection etter at komponenten er montert
    onMounted(() => {
      testConnection();
    });
  }
};
</script>

<style scoped>
/* Legg til stil her hvis nødvendig */
</style>
