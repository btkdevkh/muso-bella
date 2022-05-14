<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
      <input 
        required
        type="email" 
        placeholder="Email"
        v-model="email"
      >
      <input 
        required
        type="password" 
        placeholder="Password"
        v-model="password"
      >
      <div class="error">{{ error }}</div>
      <button>{{ isPending ? 'Loading...' : 'Login' }}</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

export default {
  setup(props, context) {
    const router = useRouter()
    const { error, isPending, login } = useLogin()

    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      await login(email.value, password.value)

      if(!error.value) router.push({ name: 'UserPlaylists' })
    }

    return { error, email, password, isPending, handleSubmit }
  }
}
</script>

<style>

</style>