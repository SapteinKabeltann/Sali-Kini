<template>
    <div>
        <nav class="navbar">
            <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
            <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
            <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
            <NuxtLink to ="/user" class="nav-link">Min side</NuxtLink>
        </nav> 
        <slot />
        <!-- her kan du ligge en footer -->
    </div>
</template>

<style scoped>
.navbar {
  width: 100%;
  background-color: rgb(170, 146, 111);
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  margin: 0; /* Sørg for at navbaren ikke har margin */
}

.nav-link {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1.2rem;
}
</style>