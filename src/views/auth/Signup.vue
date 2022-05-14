<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input 
      required
      type="text" 
      placeholder="Display name"
      v-model="displayname"
    >
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
    <button>{{ isPending ? 'Loading...' : 'Sign up' }}</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

export default {
  setup(props) {
    const router = useRouter()

    const { error, isPending, signup } = useSignup()
    const displayname = ref('')
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayname.value)
      
      if(!error.value) router.push({ name: 'UserPlaylists' })
    }

    return { error, isPending, displayname, email, password, handleSubmit }
  }
}
</script>

<style>

</style>