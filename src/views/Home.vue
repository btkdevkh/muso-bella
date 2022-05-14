<template>
<div class="home">
  <div v-if="documents">
    <Playlists :playlists="documents" />
  </div>

  <div class="error">{{ error }}</div>
</div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import Playlists from '../components/Playlists.vue'

export default {
  name: 'Home',
  components: { Playlists },
  setup() {
    const { error, documents } = getCollection('playlists')

    return { error, documents }
  }
}
</script>
