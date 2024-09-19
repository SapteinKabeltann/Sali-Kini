<template>
    <div class="signup-form">
        <h2>Sign Up</h2>
        
        <form @submit.prevent="submitForm">
            <div>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="firstName" required />
            </div>

            <div>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="lastName" required />
            </div>

            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>

            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
                <span :class="[passwordHas6Characters ? 'valid' : 'invalid']">
                    <span v-if="passwordHas6Characters === true">✅ Has more than 6 characters</span>
                    <span v-else>❌ Missing {{ 6 - password.length }} characters</span>
                </span>

            </div>

            <div>
                <label for="password1">Retype password:</label>
                <input type="password" id="password1" v-model="retypePassword" required />
                <span class="error" v-if="!passwordIsSame && retypePassword.length > 0">
                    Password is not same
                </span>
            </div>

            <button type="submit">Sign Up</button>

            <p v-if="error" class="error">
                {{ error }}
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const supabase = useSupabaseClient()

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const retypePassword = ref('');
const error = ref(null);

const passwordIsSame = computed(() => password.value === retypePassword.value);
const passwordHas6Characters = computed(() => password.value.length >= 6)

const submitForm = async () => {
    // Send the form data to the server
    console.log(firstName.value, lastName.value, email.value, password.value);

    if (!passwordIsSame) {
        console.log("Password does not match");
        error.value = "Password does not match"
        
        return;
    }

    const { data, error: signupError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    })

    if (signupError) {
        console.error('Error signing up:', signupError.message);
        error.value = signupError.message

        return;
    }

    // Redirect to the login page
    router.push(`/login?email=${email.value}`);
}
</script>

<style scoped>
.signup-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.signup-form h2 {
    text-align: center;
}

.signup-form div {
    margin-bottom: 1em;
}

.signup-form label {
    display: block;
    margin-bottom: 0.5em;
}

.signup-form input {
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
}

.signup-form button {
    width: 100%;
    padding: 0.7em;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.signup-form button:hover {
    background-color: #0056b3;
}

.signup-form .error, .signup-form .invalid {
    color: red;
}

.signup-form .valid {
    color: green;
}
</style>