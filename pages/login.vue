<template>
  <div class="container">        
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
const router = useRouter()

const signInWithPassword = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
        
    })
    
    if (error) console.log(error)

    else {
        console.log('logged in')
        router.push('/')
    }
}

/*watch(username, (newInput, oldInput) =>  {
console.log(newInput, oldInput);
})*/
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>