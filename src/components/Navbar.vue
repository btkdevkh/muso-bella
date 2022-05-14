<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/bella.png" alt="">
      <h1><router-link :to="{ name: 'Home' }">Muso Songs</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'UserPlaylists' }" class="btn">My Playlist</router-link>
          <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create Playlist</router-link>
          <span>
            Hi, {{ user.displayName }}
          </span>
          <button v-if="user" @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Signup' }" class="btn">Signup</router-link>
          <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const { error, logout } = useLogout()
    const { user } = getUser()

    const handleLogout = async () => {
      await logout()

      if(!error.value) router.push({ name: 'Login' })
    }

    return { handleLogout, user }
  }
}
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
.navbar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a, button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
</style>