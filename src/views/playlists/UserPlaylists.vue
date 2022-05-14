<template>
  <div class="user-playlists">
    <div v-if="playlists">
      <Playlists :playlists="playlists" />    
    </div>
  </div>
  <router-link class="btn" :to="{ name: 'CreatePlaylist' }">Create New Playlist</router-link>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import Playlists from '@/components/Playlists'

export default {
  components: { Playlists },
  setup() {
    const { user } = getUser()
    const { documents: playlists } = getCollection('playlists', ['userId', '==', user.value.uid])

    return { playlists }
  }
}
</script>

<style>

</style>