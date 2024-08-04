<template>
  <div class="container">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Hjem</NuxtLink>
      <NuxtLink to="/kjope" class="nav-link">Kjøp</NuxtLink>
      <NuxtLink to="/selge" class="nav-link">Salg</NuxtLink>
    </nav>
        
        <form @submit.prevent="signInWithPassword">
            <input type="email" autocomplete="email" v-model="email" placeholder="Username">
            <input type="password" v-model="password" placeholder="Password">
            <button>submit</button>
        </form>
        
    </div>
    
</template>

<script setup>

const email = ref(null)
const password = ref(null)
const supabase = useSupabaseClient()

const signInWithPassword = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
        
    })
    
    if (error) console.log(error)
}

/*watch(username, (newInput, oldInput) =>  {
console.log(newInput, oldInput);
})*/
</script>

<style>
.container{
    display: flex;
    justify-content: center;
    margin-top: 10rem;
}


.navbar {
  width: 100%;
  background-color: rgb(207, 189, 110);
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

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
}
</style>